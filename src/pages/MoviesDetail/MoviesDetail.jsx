import React from "react";
import './MoviesDetail.css'
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import TitleBar from "../../widget/TitleBar/TitleBar";
import ColorThief from "../../utils/ColorThief";
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Descriptions,
    Divider,
    Icon,
    Popover,
    Progress,
    Rate,
    Row,
    Typography
} from 'antd';
import ShortCommentList from "../../widget/ShortCommentList/ShortCommentList";
import DiscussesList from "../../widget/DiscussesList/DiscussesList";
import StaffList from "../../widget/StaffList/StaffList";
import axios from "axios";
import Error from "../../widget/Error/Error";
import Loading from "../../widget/Loading/Loading";
import LongCommentList from "../../widget/LongCommentList/LongCommentList";

const {Title, Paragraph, Text} = Typography;
const Element = BannerAnim.Element;
const scoresList = [5, 4, 3, 2, 1];
const workList = ["导演", "编剧", "演员"];
export default class MoviesDetail extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'details-switch',
    };

    constructor(props) {
        super(props);
        this.oneEnter = false;
        this.palettes = [[
            "rgb(118, 65, 20)",
            "rgb(251, 227, 147)",
            "rgb(230, 166, 79)",
            "rgb(202, 117, 38)",
            "rgb(204, 184, 152)"
        ]];
        this.state = {
            movieId: props.match.params.id,
            movieData: {},
            shortCommentPage: 1,
            shortCommentTotal: 0,
            shortCommentList: null,
            longCommentPage: 1,
            longCommentTotal: 0,
            longCommentList: null,
            discussPage: 1,
            discussTotal: 0,
            discussList: null,
            hasError: false,
            palettes: this.palettes,
            windowWidth: window.innerWidth,
            showInt: 0,
            delay: 0,
            imgAnim: [
                {translateX: [0, 300], opacity: [1, 0]},
                {translateX: [0, -300], opacity: [1, 0]},
            ],
        };
        this.colorThief = new ColorThief();
    };

    thiefPalette(index) {
        // const data = this.colorThief.getPalette(this[`$img${index}`], 6);
        // data.shift();
        // const rgb = this.colorThief.convertColorRgb(data);
        // this.palettes[index] = rgb;
        // this.setState({palettes: this.palettes})
    };

    onChange = () => {
        if (!this.oneEnter) {
            this.setState({delay: 300});
            this.oneEnter = true;
        }
    };

    getDuration = (e) => {
        if (e.key === 'map') {
            return 800;
        }
        return 1000;
    };

    onWindowResize = () => {
        this.setState({
            windowWidth: window.innerWidth
        });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    componentDidMount() {
        const that = this;
        window.addEventListener('resize', this.onWindowResize);
        axios.get("/api/movie/" + this.state.movieId).then(
            res => {
                if (JSON.stringify(res.data) === '{}') {
                    that.setState({
                        hasError: true
                    });
                }
                that.setState({
                    movieData: res.data
                });
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    getShortCommentData(pageNum, pageSize) {
        axios.get("/api/movie/" + this.state.movieId + "/shortComment?page=" + pageNum + "&size=" + pageSize).then(
            res => {
                let shortCommentList = [];
                let i = 0;
                for (let comment of res.data.short_comments_list) {
                    shortCommentList.push({
                        key: i++,
                        movieId: comment.short_comment.moiveid,
                        commentId: comment.short_comment.shortcommentsid,
                        // 基本信息
                        authorName: comment.short_comment.nickname,
                        movieName: "",
                        movieScore: comment.short_comment.shortcommentsscore * 2,
                        editTime: comment.short_comment.shortcommentscreatetime,
                        commentType: comment.short_comment.shortcommentstype,
                        commentContent: comment.short_comment.shortcommentscontent,
                        authorPic: comment.short_comment.useravatar,
                        likeNumber: comment.short_comment.shortcommentslikenum,
                        isLike: comment.like
                    })
                }
                this.setState({
                    shortCommentList: shortCommentList,
                    shortCommentTotal: res.data.short_comments_num,
                    shortCommentPage: pageNum
                })
            }
        )
    }

    getLongCommentData(pageNum, pageSize) {
        axios.get("/api/movie/" + this.state.movieId + "/longComment?page=" + pageNum + "&size=" + pageSize).then(
            res => {
                let longCommentList = [];
                let i = 0;
                for (let comment of res.data.comments) {
                    longCommentList.push({
                        key: i++,
                        movieId: this.state.movieId,
                        commentId: comment.longCommentsId,
                        // 基本信息
                        authorName: comment.username,
                        movieName: "",
                        movieScore: comment.score * 2,
                        editTime: comment.createTime,
                        commentTitle: comment.title,
                        commentContent: comment.content,
                        authorPic: comment.avatar,
                        moviePic: "",
                        likeNumber: comment.likeNum,
                        dislikeNumber: comment.unlikeNum,
                        likeType: comment.likeType
                    })
                }
                this.setState({
                    longCommentList: longCommentList,
                    longCommentTotal: res.data.commentsNum,
                    longCommentPage: pageNum
                })
            }
        )
    }

    getDiscussData(pageNum, pageSize) {
        axios.get("/api/movie/" + this.state.movieId + "/discusses?page=" + pageNum + "&size=" + pageSize).then(
            res => {
                let discussList = [];
                let i = 0;
                for (let comment of res.data.discuses) {
                    discussList.push({
                        key: i++,
                        discussID: comment.DiscusId,
                        discussName: comment.title,
                        authorName: comment.username,
                        updateTime: comment.createTime
                    })
                }
                this.setState({
                    discussList: discussList,
                    discussTotal: res.data.discusesNum,
                    discussPage: pageNum
                })
            }
        )
    }


    render() {
        if (this.state.hasError) {
            return (
                <Error content={"出错了，未找到相关电影。"}/>
            )
        }
        if (JSON.stringify(this.state.movieData) === '{}') {
            return (
                <div style={{height: '100%'}}>
                    <TitleBar key="a" title={"影片"}/>
                    <Loading/>
                </div>
            )
        }
        const movieData = this.state.movieData.movies;
        const cover = movieData.movie_cover;
        const name = movieData.name;
        let mobileInfoStr = "";
        if (movieData.hasOwnProperty('movie_area')) {
            mobileInfoStr += movieData.movie_area + '/';
        }
        if (movieData.hasOwnProperty('movie_type')) {
            mobileInfoStr += movieData.movie_type + '/';
        }
        if (movieData.hasOwnProperty('date_str')) {
            mobileInfoStr += movieData.date_str + '/';
        }
        if (movieData.hasOwnProperty('film_length')) {
            mobileInfoStr += '片长' + movieData.film_length + '分钟';
        }
        const staffData = this.state.movieData.staffs;
        const staffList = [];
        let staffKey = 0;
        for (let staff of staffData) {
            staffList.push({
                key: staffKey++,
                staffID: staff.staff_id,
                staffName: staff.staff_name,
                staffPic: staff.staff_photo,
                staffWork: workList[staff.staff_type]
            })
        }
        const scoreData = this.state.movieData.score;
        const totalScore = (
            scoreData.star5 * 10 +
            scoreData.star4 * 8 +
            scoreData.star3 * 6 +
            scoreData.star2 * 4 +
            scoreData.star1 * 2).toFixed(1);
        const awardsData = this.state.movieData.awards;
        return (
            <div className={"movies-details"}>
                <TitleBar key="a" title={"影片"}/>
                <div key="b" className={`${this.props.className}-wrapper`}
                     style={{background: this.state.palettes[0][0], zIndex: '0'}}>
                    <div className={this.props.className}>
                        <BannerAnim prefixCls={`${this.props.className}-img-wrapper`}
                                    sync type="across" duration={1000} ease="easeInOutExpo"
                                    arrow={false} thumb={false} onChange={this.onChange} dragPlay={false}
                        >
                            <Element key={0} style={{background: this.state.palettes[0][1], height: '100%',}}
                                     leaveChildHide>
                                <QueueAnim animConfig={this.state.imgAnim} duration={this.getDuration}
                                           delay={[this.state.delay, 0]} ease={['easeOutCubic', 'easeInQuad']}
                                           key="img-wrapper"
                                >
                                    <div className={`${this.props.className}-pic`} key="pic" style={{
                                        backgroundImage: 'url(' + cover + ')',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no repeat',
                                        backgroundSize: 'cover',
                                        width: '100%',
                                        height: '100%'
                                    }}/>
                                </QueueAnim>
                            </Element>
                        </BannerAnim>
                        <BannerAnim prefixCls={`${this.props.className}-text-wrapper`} sync type="across"
                                    duration={1000} arrow={false} thumb={false} ease="easeInOutExpo" dragPlay={false}
                                    ref={(c) => {
                                        this.bannerText = c;
                                    }}
                        >
                            <Element key={0}>
                                <QueueAnim type="bottom" duration={1000}
                                           delay={[this.state.delay + 500, 0]}>
                                    <div className={"movie-detail"} key={"1"}>
                                        <Title level={4}>{name}
                                            {movieData.hasOwnProperty('release_date') ?
                                                <span
                                                    style={{color: "rgba(0,0,0,0.6)"}}> ({movieData.release_date.substring(0, 4)})</span>
                                                : null}
                                        </Title>
                                        <em style={{background: this.state.palettes[0][0]}}/>
                                        <Row style={{marginTop: '10px'}}>
                                            <Col xl={12} lg={24}>
                                                {this.state.windowWidth >= 576 ?
                                                    <Descriptions column={1}>
                                                        {movieData.hasOwnProperty('movie_type') ?
                                                            <Descriptions.Item
                                                                label="类型">{movieData.movie_type}</Descriptions.Item> : null}
                                                        {movieData.hasOwnProperty('movie_area') ?
                                                            <Descriptions.Item
                                                                label="制片国家/地区">{movieData.movie_area}</Descriptions.Item> : null}
                                                        {movieData.hasOwnProperty('date_str') ?
                                                            <Descriptions.Item
                                                                label="上映日期">{movieData.date_str}</Descriptions.Item> : null}
                                                        {movieData.hasOwnProperty('film_length') ?
                                                            <Descriptions.Item
                                                                label="片长">{movieData.film_length}分钟</Descriptions.Item> : null}
                                                        {movieData.hasOwnProperty('alias') ?
                                                            <Descriptions.Item
                                                                label="又名">{movieData.alias}</Descriptions.Item> : null}
                                                    </Descriptions> :
                                                    <Descriptions>
                                                        <Descriptions.Item>
                                                            {mobileInfoStr}
                                                        </Descriptions.Item>
                                                    </Descriptions>}
                                            </Col>
                                            {this.state.windowWidth >= 1200 ?
                                                <Col xl={{span: 10, offset: 2}}>
                                                    <Card size="small"
                                                          actions={[
                                                              <div>
                                                                  <Icon type="heart" theme="filled"/>
                                                                  &nbsp;想看
                                                              </div>,
                                                              <div>
                                                                  <Icon type="star" theme="filled"/>
                                                                  &nbsp;看过
                                                              </div>,
                                                              <div>
                                                                  <Icon type="edit" theme="filled"/>
                                                                  &nbsp;写影评
                                                              </div>,
                                                          ]}>
                                                        <Row className={"score-total"} type="flex" justify="center"
                                                             align="middle" style={{padding: '10px'}}>
                                                            <Col xl={{span: 6, offset: 3}}>
                                                                <Title>{totalScore}</Title>
                                                            </Col>
                                                            <Col xl={{span: 12, offset: 2}}>
                                                                <Row>
                                                                    <Rate disabled allowHalf
                                                                          defaultValue={Math.round(totalScore) / 2}/>
                                                                </Row>
                                                                <Row>
                                                                    <Text>{scoreData.comment_num}人评价</Text>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        {scoresList.map((number) => {
                                                            return (
                                                                <Row key={number} type="flex" justify="center"
                                                                     align="middle"
                                                                     style={{lineHeight: '15px', marginLeft: '-55px'}}>
                                                                    <Col className={"score-preview"}
                                                                         xxl={{span: 8}} xl={{span: 9}}
                                                                         style={{textAlign: "right"}}>
                                                                        <Rate disabled count={number}
                                                                              defaultValue={number}/>
                                                                    </Col>
                                                                    <Col xxl={{span: 11, offset: 1}}
                                                                         xl={{span: 11, offset: 1}}>
                                                                        <Progress
                                                                            status={"normal"}
                                                                            showInfo={this.state.windowWidth >= 1600}
                                                                            percent={parseFloat((scoreData['star' + number] * 100).toFixed(2))}/>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })}
                                                    </Card>
                                                </Col> : null}
                                        </Row>
                                    </div>
                                </QueueAnim>
                            </Element>
                        </BannerAnim>
                    </div>
                    <img style={{
                        width: '100%',
                        filter: "blur(30px)",
                        top: 0,
                        left: 0,
                        position: "absolute",
                        zIndex: -1000
                    }}
                         src={cover}
                         alt={"电影背景图"}
                         crossOrigin={"anonymous"}
                         ref={dom => {
                             this[`$img${0}`] = dom
                         }}
                         onLoad={() => this.thiefPalette(0)}
                    />
                </div>
                {this.state.windowWidth < 1200 ?
                    <div key={"b-small"} className={"mobile-score-board"}
                         style={{background: '#fff', padding: '20px 20px 1px 20px'}}>
                        <Row type="flex" justify="space-between" align="middle">
                            <Col span={12}>
                                <Title level={4}>{"影片评分"}</Title>
                            </Col>
                            <Col span={12} style={{textAlign: "right"}}>
                                <div>
                                    <Popover content={"想看"}>
                                        <Button shape="circle" style={{marginRight: '10px'}}>
                                            <Icon type="heart" theme="filled"/>
                                        </Button>
                                    </Popover>
                                    <Popover content={"看过"}>
                                        <Button shape="circle" style={{marginRight: '10px'}}>
                                            <Icon type="star" theme="filled"/>
                                        </Button>
                                    </Popover>
                                    <Popover content={"写影评"}>
                                        <Button shape="circle">
                                            <Icon type="edit" theme="filled"/>
                                        </Button>
                                    </Popover>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col xs={24} sm={6}>
                                <Row className={"score-total"} justify="center" align="middle"
                                     style={{padding: '10px'}}>
                                    <Col xs={12} sm={24} style={{
                                        textAlign: (this.state.windowWidth > 576) ? "left" : "center"
                                    }}>
                                        <Title>{totalScore}</Title>
                                    </Col>
                                    <Col xs={12} sm={24}>
                                        <Row>
                                            <Rate disabled allowHalf
                                                  defaultValue={Math.round(totalScore) / 2}
                                            />
                                        </Row>
                                        <Row>
                                            <Text>{scoreData.comment_num}人评价</Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} sm={18} style={{verticalAlign: 'middle'}}>
                                {scoresList.map((number) => {
                                    return (
                                        <Row key={number} type="flex" justify="center"
                                             align="middle" style={{lineHeight: '15px', marginLeft: '-55px'}}>
                                            <Col className={"score-preview"}
                                                 xxl={{span: 8}} xl={{span: 9}}
                                                 xs={{span: 8}}
                                                 style={{textAlign: "right"}}>
                                                <Rate disabled count={number}
                                                      defaultValue={number}/>
                                            </Col>
                                            <Col xxl={{span: 11, offset: 1}}
                                                 xl={{span: 11, offset: 1}}
                                                 xs={{span: 11, offset: 1}}>
                                                <Progress
                                                    status={"normal"} showInfo={this.state.windowWidth > 576}
                                                    percent={parseFloat((scoreData['star' + number] * 100).toFixed(2))}/>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Col>
                        </Row>
                        <Divider/>
                    </div> : null}
                <div key="c" style={{
                    background: '#fff',
                    padding: this.state.windowWidth >= 1200 ? '20px 20px 1px 20px' : '0px 20px 1px 20px'
                }}>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col>
                            <Title level={4}>{name + " 的剧情简介"}</Title>
                        </Col>
                    </Row>
                    <Paragraph>
                        {movieData.hasOwnProperty('info') ? movieData.info : "暂无剧情简介"}
                    </Paragraph>
                    <Divider/>
                </div>
                {awardsData.length > 0 ?
                    <div key="d" style={{
                        background: '#fff',
                        padding: '0px 20px 1px 20px'
                    }}>
                        <Row type="flex" justify="space-between" align="middle">
                            <Col>
                                <Title level={4}>{name + " 的获奖记录"}</Title>
                            </Col>
                        </Row>
                        <Breadcrumb className={"bread-crumb"}>
                            {awardsData.map((data) => {
                                return (
                                    <Breadcrumb.Item key={data.awardid} href={"/discuss/" + data.awardid}>
                                        {data.awardname}
                                    </Breadcrumb.Item>
                                )
                            })}
                        </Breadcrumb>
                        <Divider/>
                    </div> : null}
                <StaffList key="e" withTitle={true} title={name + " 的演职人员"} data={staffList}/>
                <ShortCommentList key="f" withTitle={true} title={name + " 的短评"}
                                  data={this.state.shortCommentList} total={this.state.shortCommentTotal}
                                  page={this.state.shortCommentPage}
                                  withLike={true} getDataFunction={this.getShortCommentData.bind(this)}/>

                <LongCommentList key="g" withTitle={true} title={name + " 的长评"}
                                 data={this.state.longCommentList} total={this.state.longCommentTotal}
                                 page={this.state.longCommentPage}
                                 getDataFunction={this.getLongCommentData.bind(this)}
                                 withAuthorPicShow={true} withLikeOrDisLike={true}/>

                <DiscussesList key="h" withTitle={true} title={name + " 的讨论区"}
                               data={this.state.discussList} total={this.state.discussTotal}
                               page={this.state.discussTotal}
                               getDataFunction={this.getDiscussData.bind(this)}
                               isLastNode={true}/>
            </div>
        );
    }
}
