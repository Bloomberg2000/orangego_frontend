import React from "react";
import './Banner.css'
import {Button, Col, Icon, Row} from "antd";
import * as PropTypes from "prop-types";
import Swiper from "swiper";
import 'swiper/css/swiper.css'
import {enquireScreen} from 'enquire-js';

export default class Banner extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        isMobile: PropTypes.array,
        screenWidth: PropTypes.number
    };

    state = {
        isMobile: false,
        windowWidth: window.innerWidth
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

    // 监测屏幕变化
    componentDidMount() {

        window.onresize = () => {
            this.setState({
                windowWidth: window.innerWidth
            });
        };
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let slidesPreView = 0;
        let slidesPerGroup = 4;
        if (this.state.windowWidth >= 1600) {
            slidesPreView = 4;
            slidesPerGroup = 4;
        } else if (this.state.windowWidth >= 1200) {
            slidesPreView = 3;
            slidesPerGroup = 3;
        } else if (this.state.windowWidth >= 768) {
            slidesPreView = 2;
            slidesPerGroup = 2;
        } else {
            slidesPreView = 1;
            slidesPerGroup = 1;
        }
        this.swiper = new Swiper('.swiper-container', {
            slidesPerView: slidesPreView,
            slidesPerGroup: slidesPerGroup,
            autoplay: {
                delay: 5000,
            },
            freeMode: false,
            direction: 'horizontal',//竖向轮播
            loop: true
        })
    }

    render() {
        return (
            <div id="BannerPage" style={{background: '#f7f7f7', padding: '0'}}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={2} style={{textAlign: "center"}}>
                        <Button shape="circle" onClick={() => {
                            this.swiper.slidePrev();
                        }}>
                            <Icon type="left"/>
                        </Button>
                    </Col>
                    <Col span={20} style={{textAlign: "center"}}>
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {
                                    this.props.data.map((item) => {
                                        return (
                                            <div key={item.key} className="swiper-slide">
                                                <div className="banner-box" style={{
                                                    backgroundImage: 'url(' + item.imgSrc + ')',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no repeat',
                                                    backgroundSize: 'cover'
                                                }}>
                                                    <div className="banner-info">
                                                        <div className="banner-title">{item.title}</div>
                                                        <div className="banner-description">{item.description}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </Col>
                    <Col span={2} style={{textAlign: "center"}}>
                        <Button shape="circle" onClick={() => {
                            this.swiper.slideNext();
                        }}>
                            <Icon type="right"/>
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
