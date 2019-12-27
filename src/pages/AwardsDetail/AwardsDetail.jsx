import React from "react";
import './AwardsDetail.css'
import TitleBar from "../../widget/TitleBar/TitleBar";
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import {Typography} from "antd";
import PropTypes from "prop-types";
import {OrangoGoIcon} from "../../App";
import axios from "axios";
import Loading from "../../widget/Loading/Loading";
import MoviesSingleLineList from "../../widget/MoviesSingleLineList/MoviesSingleLineList";
import Error from "../../widget/Error/Error";

const Element = BannerAnim.Element;
const {Title} = Typography;

export default class AwardsDetail extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'awards-details-switch',
    };

    constructor(props) {
        super(props);
        this.state = {
            awardId: props.match.params.id,
            awardData: {},
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
        axios.get("/api/awards/" + this.state.awardId).then(
            res => {
                if (JSON.stringify(res.data) === '{}') {
                    that.setState({
                        hasError: true
                    });
                }
                that.setState({
                    awardData: res.data
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
                <Error content={"出错了，未找到相关奖项。"}/>
            )
        }
        if (JSON.stringify(this.state.awardData) === '{}') {
            return (
                <div style={{height: '100%'}}>
                    <TitleBar key="a" title={"奖项"}/>
                    <Loading/>
                </div>
            )
        }
        const awardData = this.state.awardData.award;
        const movieData = this.state.awardData.movies;
        const awardMovieData = [];
        for (let movie of movieData) {
            awardMovieData.push({
                id: movie.moiveid,
                name: movie.moivename,
                score: movie.moviescore,
                imgSrc: movie.moivecover
            })
        }
        return (
            <div className={"awardsDetail"}>
                <TitleBar key="a" title={"奖项"}/>
                <div key="b" className={`${this.props.className}-wrapper`}
                     style={{background: '#f7f7f7', padding: '0'}}>
                    <div className={this.props.className}>
                        <BannerAnim prefixCls={`${this.props.className}-text-wrapper`} sync type="across"
                                    duration={1000} arrow={false} thumb={false} ease="easeInOutExpo"
                                    dragPlay={false}
                        >
                            <Element key={0}>
                                <QueueAnim type="bottom" duration={1000}
                                           delay={[this.state.delay + 500, 0]}>
                                    <div className={"awards-details"} key={"1"}>
                                        <div className={"awards-details-right-panel"} style={{textAlign: 'center'}}>
                                            <Title level={4} style={{textAlign: 'center'}}>
                                                <OrangoGoIcon type={"icon-award"}/>&nbsp;{awardData.cName}
                                            </Title>
                                            {awardData.hasOwnProperty('cLocation') ?
                                                <div
                                                    style={{fontWeight: 'bold', fontSize: '18px', padding: '10px'}}>
                                                    {awardData.cLocation}
                                                </div>
                                                : null}
                                            {awardData.hasOwnProperty('dStartDate') && awardData.hasOwnProperty('dEndDate') ?
                                                <div>
                                                    {awardData.dStartDate} - {awardData.dEndDate}
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                </QueueAnim>
                            </Element>
                        </BannerAnim>
                    </div>
                </div>
                <MoviesSingleLineList key="c" withTitle={true} title={"获奖影片"} data={awardMovieData}
                                      isFirstNode={true} isLastNode={true}/>
            </div>
        );
    }
}
