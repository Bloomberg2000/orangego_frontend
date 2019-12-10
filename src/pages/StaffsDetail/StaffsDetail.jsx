import React from "react";
import './Staffs️Detail.css'
import TitleBar from "../../widget/TitleBar/TitleBar";
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import MoviesSingleLineList from "../../widget/MoviesSingleLineList/MoviesSingleLineList";
import {Avatar, Col, Descriptions, Divider, Row, Typography} from "antd";
import PropTypes from "prop-types";
import ColorThief from "../../utils/ColorThief";

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
            showInt: 0,
            delay: 0,
            imgAnim: [
                {translateX: [0, 300], opacity: [1, 0]},
                {translateX: [0, -300], opacity: [1, 0]},
            ],
        };
        this.oneEnter = false;
        this.palettes = [[
            "rgb(118, 65, 20)",
            "rgb(251, 227, 147)",
            "rgb(230, 166, 79)",
            "rgb(202, 117, 38)",
            "rgb(204, 184, 152)"
        ]]

        this.state = {
            palettes: this.palettes,
        }

        this.colorThief = new ColorThief()
    }

    thiefPalette(index) {
        const data = this.colorThief.getPalette(this[`$img${index}`], 6);
        data.shift()
        const rgb = this.colorThief.convertColorRgb(data);
        this.palettes[index] = rgb
        this.setState({palettes: this.palettes})
    }

    onChange = () => {
        if (!this.oneEnter) {
            this.setState({delay: 300});
            this.oneEnter = true;
        }
    }

    getDuration = (e) => {
        if (e.key === 'map') {
            return 800;
        }
        return 1000;
    };

    render() {
        const pic = '/imgs/p49511.webp';
        const name = '徐峥'
        let gender = 1
        const birthday = "1972-04-18"
        const occupation = "演员/制片人/导演/编剧/配音"
        const foreignName = "Zheng Xu"
        const bitthPlace = "中国,上海";
        if (gender === 0) {
            gender = "未知"
        } else if (gender === 1) {
            gender = "男"
        } else {
            gender = "女"
        }
        return (
            <div className={"staffDetail"}>
                <QueueAnim delay={300}>
                    <TitleBar key="a" title={"影人"}/>
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
                                        <div className={"staff-detail"} key={"1"}>
                                            <div className={"staff-detail-left-panel"}>
                                                <Avatar size={128} src={pic}/>
                                            </div>
                                            <div className={"staff-detail-right-panel"}>
                                                <Title level={4}>
                                                    {name}<span
                                                    style={{color: "rgba(0,0,0,0.6)"}}>{foreignName}</span>
                                                </Title>
                                            </div>
                                        </div>
                                    </QueueAnim>
                                </Element>
                            </BannerAnim>
                        </div>
                        <img style={{
                            visibility: 'hidden'
                        }}
                             src={pic}
                             crossOrigin={"anonymous"}
                             ref={dom => {
                                 this[`$img${0}`] = dom
                             }}
                             onLoad={() => this.thiefPalette(0)}
                        />
                    </div>
                    <em style={{background: this.state.palettes[0][0]}}/>
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
                            <Descriptions.Item label="出生日期">{birthday}</Descriptions.Item>
                            <Descriptions.Item label="职业">{occupation}</Descriptions.Item>
                            <Descriptions.Item label="地区">{bitthPlace}</Descriptions.Item>
                        </Descriptions>
                        <Divider/>
                    </div>
                    <MoviesSingleLineList key="c" withTitle={true} title={"TA参与制作的电影"} data={moviesData}
                                          isFirstNode={true}/>
                    <MoviesSingleLineList key="d" withTitle={true} title={"TA参演的电影"} data={moviesData}
                                          isLastNode={true}/>
                </QueueAnim>
            </div>
        );
    }
}
