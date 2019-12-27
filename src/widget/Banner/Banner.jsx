import React from "react";
import './Banner.css'
import {Button, Col, Icon, Row} from "antd";
import * as PropTypes from "prop-types";
import Swiper from "swiper";
import 'swiper/css/swiper.css'
import Loading from "../Loading/Loading";

export default class Banner extends React.Component {

    static propTypes = {
        data: PropTypes.array,
    };

    state = {
        windowWidth: window.innerWidth,
        isBannerHover: false,
        isButtonHover: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        }, this.onWindowResize);
    }

    onWindowResize = () => {
        this.setState({
            windowWidth: window.innerWidth
        }, this.buildSwiper);
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.buildSwiper();
    }

    buildSwiper = () => {
        let slidesPreView = 0;
        let slidesPerGroup = 1;
        if (this.state.windowWidth >= 1200) {
            slidesPreView = 3.25;
            slidesPerGroup = 1;
        } else if (this.state.windowWidth >= 768) {
            slidesPreView = 2.25;
            slidesPerGroup = 1;
        } else {
            slidesPreView = 1.25;
            slidesPerGroup = 1;
        }
        this.swiper = new Swiper('.bannerSwiper', {
            slidesPerView: slidesPreView,
            slidesPerGroup: slidesPerGroup,
            freeMode: false,
            direction: 'horizontal',//竖向轮播
            loop: true,
            navigation: {
                nextEl: '.bannerSwiperNextButton',
                prevEl: '.bannerSwiperPrevButton',
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
        return (
            <div id="BannerPage" style={{background: '#f7f7f7', padding: '0'}}>
                <Row type="flex" justify="space-around" align="middle">
                    {this.state.data === null ?
                        <div style={{height: '100%', padding: '60px 0'}}>
                            <Loading/>
                        </div> :
                        <Col span={24} style={{textAlign: "center", padding: '0 20px 0 20px'}}>
                            <div className="swiper-container bannerSwiper" onMouseLeave={this.onMouseLeaveBannerAction}
                                 onMouseOver={this.onMouseOverBannerAction}>
                                <div className="swiper-wrapper">
                                    {
                                        this.state.data.map((item) => {
                                            return (
                                                <div key={item.key} className="swiper-slide" onClick={() => {
                                                    window.location.href = "/movie/" + item.id
                                                }}>
                                                    <div className="banner-box" style={{
                                                        backgroundImage: 'url(' + item.imgSrc + ')',
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no repeat',
                                                        backgroundSize: 'cover'
                                                    }}>
                                                        <div className="banner-info">
                                                            <div className="banner-title">{item.title}</div>
                                                            <div
                                                                className="banner-description">{item.description}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                            <div className="swiper-button-prev bannerSwiperPrevButton">
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
                            <div className="swiper-button-next bannerSwiperNextButton">
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
                    }
                </Row>
            </div>
        );
    }
}
