import React from "react";
import './AwardsDetail.css'
import TitleBar from "../../widget/TitleBar/TitleBar";
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import MoviesSingleLineList from "../../widget/MoviesSingleLineList/MoviesSingleLineList";
import {Typography} from "antd";
import PropTypes from "prop-types";
import {OrangoGoIcon} from "../../App";

const Element = BannerAnim.Element;
const {Title, Paragraph, Text} = Typography;

const moviesData = [
    {name: '罗小黑战记', score: 8.1, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.2, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.3, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.4, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.5, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
    {name: '罗小黑战记', score: 8.6, imgSrc: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2568288336.jpg"},
];

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
            showInt: 0,
            delay: 0,
            imgAnim: [
                {translateX: [0, 300], opacity: [1, 0]},
                {translateX: [0, -300], opacity: [1, 0]},
            ],
        };
    }

    render() {
        const name = '第55届台北金马影展'
        const startDate = "2018-11-08"
        const endDate = "2018-11-17"
        const location = "台湾,台北"
        return (
            <div className={"awardsDetail"}>
                <QueueAnim delay={300}>
                    <TitleBar key="a" title={"奖项"}/>
                    <div key="b" className={`${this.props.className}-wrapper`}
                         style={{background: '#f7f7f7', padding: '0'}}>
                        <div className={this.props.className}>
                            <BannerAnim prefixCls={`${this.props.className}-text-wrapper`} sync type="across"
                                        duration={1000} arrow={false} thumb={false} ease="easeInOutExpo"
                                        dragPlay={false}
                                        ref={(c) => {
                                            this.bannerText = c;
                                        }}
                            >
                                <Element key={0}>
                                    <QueueAnim type="bottom" duration={1000}
                                               delay={[this.state.delay + 500, 0]}>
                                        <div className={"awards-details"} key={"1"}>
                                            <div className={"awards-details-right-panel"} style={{textAlign: 'center'}}>
                                                <Title level={4} style={{textAlign: 'center'}}>
                                                    <OrangoGoIcon type={"icon-award"}/>&nbsp;{name}
                                                </Title>
                                                <div style={{fontWeight: 'bold', fontSize: '18px', padding: '10px'}}>
                                                    {location}
                                                </div>
                                                <div>
                                                    {startDate} - {endDate}
                                                </div>
                                            </div>
                                        </div>
                                    </QueueAnim>
                                </Element>
                            </BannerAnim>
                        </div>
                    </div>
                    <MoviesSingleLineList key="c" withTitle={true} title={"获奖影片"} data={moviesData}
                                          isFirstNode={true} isLastNode={true}/>
                </QueueAnim>
            </div>
        );
    }
}
