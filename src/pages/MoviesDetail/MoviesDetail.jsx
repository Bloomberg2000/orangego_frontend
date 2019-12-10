import React from "react";
import './MoviesDetail.css'
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import TitleBar from "../../widget/TitleBar/TitleBar";
import ColorThief from "../../utils/ColorThief";
import {Card, Col, Descriptions, Progress, Rate, Row, Typography} from 'antd';

const {Title, Paragraph, Text} = Typography;
const Element = BannerAnim.Element;

export default class MoviesDetail extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'details-switch',
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
        const pic = '/imgs/p2571762536.webp';
        const content = '《终结者2：审判日》发生的27年后，由于未来天网派来T-800成功杀死年幼的约翰，以致令未来产生变化，一个全新进化的液态金属终结者从未来派出，目的是追杀持有关键讯息的丹妮·拉莫斯、半生化人葛蕾丝和她的朋友。这使莎拉·康纳以及成功杀死约翰的T800终结者前来帮助她们一行人，以共同为了人类的未来而战。'
        const title = '终结者：黑暗命运 Terminator: Dark Fate'
        const score = {
            star5: 9121,
            star4: 31232,
            star3: 32255,
            star2: 5421,
            star1: 692,
            comment_num: 78721
        };
        const totalScore = ((score.star5 * 10 + score.star4 * 8 + score.star3 * 6 + score.star2 * 4 + score.star1 * 2) / score.comment_num).toFixed(1);
        const scoresList = [5, 4, 3, 2, 1];
        return (
            <QueueAnim delay={300}>
                <TitleBar key="a" title={"影片"}/>
                <div key="b" className={`${this.props.className}-wrapper`}
                     style={{background: this.state.palettes[0][0]}}>
                    <div className={this.props.className}>
                        <BannerAnim prefixCls={`${this.props.className}-img-wrapper`}
                                    sync type="across" duration={1000} ease="easeInOutExpo"
                                    arrow={false} thumb={false} onChange={this.onChange} dragPlay={false}
                                    ref={(c) => {
                                        this.bannerImg = c;
                                    }}
                        >
                            <Element key={0} style={{background: this.state.palettes[0][1], height: '100%',}}
                                     leaveChildHide>
                                <QueueAnim animConfig={this.state.imgAnim} duration={this.getDuration}
                                           delay={[this.state.delay, 0]} ease={['easeOutCubic', 'easeInQuad']}
                                           key="img-wrapper"
                                >
                                    <div className={`${this.props.className}-pic`} key="pic" style={{
                                        backgroundImage: 'url(' + pic + ')',
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
                                        <Title level={4}>{title}
                                            <span style={{color: "rgba(0,0,0,0.6)"}}> (2019)</span>
                                        </Title>
                                        <em style={{background: this.state.palettes[0][0]}}/>
                                        <Row style={{marginTop: '10px'}}>
                                            <Col xxl={12}>
                                                <Descriptions
                                                    title="Responsive Descriptions"
                                                    column={1}
                                                >
                                                    <Descriptions.Item label="类型">动作 / 科幻 / 冒险</Descriptions.Item>
                                                    <Descriptions.Item label="制片国家/地区">语言</Descriptions.Item>
                                                    <Descriptions.Item label="上映日期">2019-11-01(美国/中国大陆) / 2019-10-23(法国)
                                                        片长: 128分钟</Descriptions.Item>
                                                    <Descriptions.Item label="又名">未来战士：黑暗命运(港) / 魔鬼终结者：黑暗宿命(台) /
                                                        终结者6：黑暗命运 /
                                                        终结者6：黑暗宿命 / 终结者2019 / 终结者6 / Terminator 6</Descriptions.Item>
                                                </Descriptions>
                                            </Col>
                                            <Col xxl={10}>
                                                <Card>
                                                    <Row className={"score-total"} type="flex" justify="center"
                                                         align="middle" style={{padding: '10px'}}>
                                                        <Col span={6} offset={4}>
                                                            <Title>{totalScore}</Title>
                                                        </Col>
                                                        <Col span={14}>
                                                            <Row>
                                                                <Rate disabled allowHalf
                                                                      defaultValue={Math.round(totalScore) / 2}/>
                                                            </Row>
                                                            <Row>
                                                                <Text>{score.comment_num}人评价</Text>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    {scoresList.map((number) => {
                                                        return (
                                                            <Row key={number} type="flex" justify="center"
                                                                 align="middle" style={{lineHeight: '15px'}}>
                                                                <Col className={"score-preview"} span={8}
                                                                     style={{textAlign: "right"}}>
                                                                    <Rate disabled count={number}
                                                                          defaultValue={number}/>
                                                                </Col>
                                                                <Col span={15} offset={1}>
                                                                    <Progress
                                                                        status={"normal"}
                                                                        percent={((score['star' + number] / score.comment_num) * 100).toFixed(2)}/>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })}
                                                </Card>
                                            </Col>
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
                         src={pic}
                         crossOrigin={"anonymous"}
                         ref={dom => {
                             this[`$img${0}`] = dom
                         }}
                         onLoad={() => this.thiefPalette(0)}
                    />
                </div>
                <div key={'c'}>
                    <Descriptions
                        title="Responsive Descriptions"
                        column={{xxl: 1, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}
                    >
                        <Descriptions.Item label="导演">蒂姆·米勒</Descriptions.Item>
                        <Descriptions.Item label="编剧"> 詹姆斯·卡梅隆 / 查尔斯·H·伊格里 / 乔什·弗莱德曼 / 大卫·S·高耶 /
                            贾斯汀·罗德斯 / 比利·雷 / 盖尔·安妮·赫德</Descriptions.Item>
                        <Descriptions.Item label="主演">麦肯兹·戴维斯 / 娜塔利娅·雷耶斯 / 琳达·汉密尔顿 / 阿诺·施瓦辛格 /
                            加布里埃尔·鲁纳 / 迪耶戈·博内塔 / 恩里克·阿尔切 / 特里斯坦·乌罗阿 / 艾丽西娅·博拉切罗 / 布雷特·阿扎尔 /
                            史蒂芬·克里 / 罗谢尔·尼尔 / 弗雷泽·杰姆斯 / 克劳迪娅·特鲁希略 / 比约恩·弗赖贝格 / 约翰·盖蒂尔 / 彼得·奥蒙德 /
                            洛娜·布朗 / 彼得·舒勒</Descriptions.Item>
                        <Descriptions.Item label="类型">动作 / 科幻 / 冒险</Descriptions.Item>
                        <Descriptions.Item label="制片国家/地区">语言</Descriptions.Item>
                        <Descriptions.Item label="上映日期">2019-11-01(美国/中国大陆) / 2019-10-23(法国)
                            片长: 128分钟</Descriptions.Item>
                        <Descriptions.Item label="又名">未来战士：黑暗命运(港) / 魔鬼终结者：黑暗宿命(台) / 终结者6：黑暗命运 /
                            终结者6：黑暗宿命 / 终结者2019 / 终结者6 / Terminator 6</Descriptions.Item>
                    </Descriptions>
                </div>
            </QueueAnim>);
    }
}
