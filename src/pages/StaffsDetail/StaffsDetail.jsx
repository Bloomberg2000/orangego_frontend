import React from "react";
import './Staffs️Detail.css'
import TitleBar from "../../widget/TitleBar/TitleBar";
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import MoviesSingleLineList from "../../widget/MoviesSingleLineList/MoviesSingleLineList";
import {Avatar, Col, Descriptions, Divider, Row, Typography} from "antd";
import PropTypes from "prop-types";
import axios from "axios";
import Loading from "../../widget/Loading/Loading";
import Error from "../../widget/Error/Error";

const Element = BannerAnim.Element;
const {Title} = Typography;

export default class StaffsDetail extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'staff-details-switch',
    };

    constructor(props) {
        super(props);
        this.state = {
            staffId: props.match.params.id,
            staffData: {},
            hasError: false,
            showInt: 0,
            delay: 0,
            imgAnim: [
                {translateX: [0, 300], opacity: [1, 0]},
                {translateX: [0, -300], opacity: [1, 0]},
            ],
        };
    }

    componentDidMount() {
        const that = this;
        window.addEventListener('resize', this.onWindowResize);
        axios.get("/api/staffs/" + this.state.staffId + '/?page=1&size=500').then(
            res => {
                if (res.data.moviesNum === 0) {
                    that.setState({
                        hasError: true
                    });
                }
                that.setState({
                    staffData: res.data,
                });
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    render() {
        if (this.state.hasError) {
            return (
                <Error content={"出错了，未找到相关影人。"}/>
            )
        }
        if (JSON.stringify(this.state.staffData) === '{}') {
            return (
                <div style={{height: '100%'}}>
                    <TitleBar key="a" title={"影人"}/>
                    <Loading/>
                </div>
            )
        }
        const staffData = this.state.staffData.staffs;
        const movieData = this.state.staffData.movies;
        const produceMovieData = [];
        const actMovieData = [];
        for (let movie of movieData) {
            // 参演
            if (movie.stafftype === 2) {
                actMovieData.push({
                    id: movie.moiveid,
                    name: movie.moviename,
                    score: movie.moviescore,
                    imgSrc: movie.moviecover
                })
            } else {
                produceMovieData.push({
                    id: movie.moiveid,
                    name: movie.moviename,
                    score: movie.moviescore,
                    imgSrc: movie.moviecover
                })
            }
        }
        let gender = staffData.nGender;
        if (gender === 1) {
            gender = "男"
        } else if (gender === 2) {
            gender = "女"
        } else {
            gender = "未知"
        }
        return (
            <div className={"staffDetail"}>
                <TitleBar key="a" title={"影人"}/>
                <div key="b" className={`${this.props.className}-wrapper`}
                     style={{background: '#f7f7f7', padding: '0'}}>
                    <div className={this.props.className}>
                        <BannerAnim prefixCls={`${this.props.className}-text-wrapper`} sync type="across"
                                    duration={1000} arrow={false} thumb={false} ease="easeInOutExpo"
                                    dragPlay={false}>
                            <Element key={0}>
                                <QueueAnim type="bottom" duration={1000}
                                           delay={[this.state.delay + 500, 0]}>
                                    <div className={"staff-detail"} key={"1"}>
                                        <div className={"staff-detail-left-panel"}>
                                            <Avatar size={128} src={staffData.cPhoto}/>
                                        </div>
                                        <div className={"staff-detail-right-panel"}>
                                            <Title level={4}>
                                                {staffData.cName}<br/>
                                                {staffData.hasOwnProperty('cForeignName') ?
                                                    <span
                                                        style={{color: "rgba(0,0,0,0.6)"}}>{staffData.cForeignName}</span>
                                                    : null}
                                            </Title>
                                        </div>
                                    </div>
                                </QueueAnim>
                            </Element>
                        </BannerAnim>
                    </div>
                </div>
                <div style={{
                    background: '#fff',
                    padding: '20px 20px 1px 20px'
                }}>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col>
                            <Title level={4}>{"影人简介"}</Title>
                        </Col>
                    </Row>
                    <Descriptions
                        style={{paddingTop: '10px'}}
                        column={{xxl: 4, xl: 4, lg: 2, md: 2, sm: 2, xs: 1}}>
                        <Descriptions.Item label="性别">{gender}</Descriptions.Item>
                        {staffData.hasOwnProperty('cBirthday') ?
                            <Descriptions.Item label="出生日期">{staffData.cBirthday}</Descriptions.Item> : null}
                        {staffData.hasOwnProperty('cOccupation') ?
                            <Descriptions.Item label="职业">{staffData.cOccupation}</Descriptions.Item> : null}
                        {staffData.hasOwnProperty('cBirthPlace') ?
                            <Descriptions.Item label="地区">{staffData.cBirthPlace}</Descriptions.Item> : null}
                    </Descriptions>
                    <Divider/>
                </div>
                {actMovieData.length > 0 ?
                    <MoviesSingleLineList key="c" withTitle={true} title={"TA参演的电影"} data={actMovieData}
                                          isLastNode={true}/>
                    : null}
                {produceMovieData.length > 0 ?
                    <MoviesSingleLineList key="d" withTitle={true} title={"TA参与制作的电影"} data={produceMovieData}
                                          isFirstNode={true}/>
                    : null}

            </div>
        );
    }
}
