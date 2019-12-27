import React from "react";
import './StaffList.css'
import {Avatar, Button, Col, Divider, Icon, Row, Typography} from "antd";
import * as PropTypes from "prop-types";
import Swiper from "swiper";
import 'swiper/css/swiper.css'
import {Route} from "react-router";

const {Title} = Typography;
export default class StaffList extends React.Component {

    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        data: PropTypes.array,
        withTitle: PropTypes.bool,
        title: PropTypes.string,
    };
    static defaultProps = {
        isLastNode: false,
        isFirstNode: false,
        withTitle: false,
    };

    state = {
        windowWidth: window.innerWidth,
        isBannerHover: false,
        isButtonHover: false,
    };

    constructor(props) {
        super(props);
        /**
         * 为数组添加Key
         */
        for (let i = 0; i < props.data.length; i++) {
            props.data[i]['key'] = i;
        }
    }

    onWindowResize = () => {
        this.setState({
            windowWidth: window.innerWidth
        });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.swiper = new Swiper('.staffListSwiper', {
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            freeMode: true,
            direction: 'horizontal',//竖向轮播
            navigation: {
                nextEl: '.staffListSwiperNextButton',
                prevEl: '.staffListSwiperPrevButton',
            },
        })
    }

    onMouseOverBannerAction = () => {
        this.setState({
            isBannerHover: true
        })
    };

    onMouseLeaveBannerAction = () => {
        this.setState({
            isBannerHover: false
        })
    };

    onMouseOverButtonAction = () => {
        this.setState({
            isButtonHover: true
        })
    };

    onMouseLeaveButtonAction = () => {
        this.setState({
            isButtonHover: false
        })
    };

    render() {
        const {withTitle, isFirstNode, isLastNode, title} = this.props;
        return (
            <div id="staffList" style={{
                background: '#fff',
                padding: (isFirstNode === true) ? '20px 20px 1px 20px' : '0px 20px 1px 20px'
            }}>
                {withTitle ?
                    <Row type="flex" justify="space-between" align="middle">
                        <Col>
                            <Title level={4}>{title}</Title>
                        </Col>
                    </Row> : null}
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24} style={{textAlign: "center", padding: '0 5px 0 5px'}}>
                        <div className="swiper-container staffListSwiper" onMouseLeave={this.onMouseLeaveBannerAction}
                             onMouseOver={this.onMouseOverBannerAction}>
                            <div className="swiper-wrapper">
                                {
                                    this.props.data.map((item) => {
                                        return (
                                            <div key={item.key} className="swiper-slide" style={{width: '200px'}}>
                                                <Route render={({match, history}) => {
                                                    return (
                                                        <div className={"staff-card"} key={"1"}
                                                             onClick={() => {
                                                                 history.push('/staff/' + item.staffID);
                                                             }}>
                                                            <div className={"staff-card-img"}>
                                                                <Avatar size={128} src={item.staffPic}/>
                                                            </div>
                                                            <div className={"staff-card-text"}>
                                                                <div>
                                                                <span style={{
                                                                    fontSize: '20px',
                                                                    fontWeight: 'bold'
                                                                }}>{item.staffName}</span><br/>
                                                                    <span
                                                                        style={{color: "rgba(0,0,0,0.6)"}}>{item.staffWork}</span>
                                                                </div>
                                                            </div>
                                                        </div>)
                                                }}/>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="swiper-button-prev staffListSwiperPrevButton">
                            <Button className="swiper-custom-button" shape="circle"
                                    onMouseLeave={this.onMouseLeaveButtonAction}
                                    onMouseOver={this.onMouseOverButtonAction}
                                    style={{opacity: (this.state.isButtonHover) ? 1 : (this.state.isBannerHover ? 0.5 : 0)}}
                                    onClick={() => {
                                        this.swiper.slidePrev();
                                    }}>
                                <Icon type="left"/>
                            </Button>
                        </div>
                        <div className="swiper-button-next staffListSwiperNextButton">
                            <Button className="swiper-custom-button" shape="circle"
                                    onMouseLeave={this.onMouseLeaveButtonAction}
                                    onMouseOver={this.onMouseOverButtonAction}
                                    style={{opacity: (this.state.isButtonHover) ? 1 : (this.state.isBannerHover ? 0.5 : 0)}}
                                    onClick={() => {
                                        this.swiper.slideNext();
                                    }}>
                                <Icon type="right"/>
                            </Button>
                        </div>
                    </Col>
                </Row>
                {!isLastNode ? <Divider/> : <div style={{margin: '20px'}}/>}
            </div>
        );
    }
}
