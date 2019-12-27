import React from "react";
import './MoviePreviewCard.css'
import {Card, Col, Rate, Row, Typography} from "antd";
import * as PropTypes from "prop-types";
import {Route} from "react-router";

const {Text} = Typography;
const {Meta} = Card;
export default class MoviePreviewCard extends React.Component {
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        score: PropTypes.number,
        imgSrc: PropTypes.string
    };


    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            score: this.props.score,
            imgSrc: this.props.imgSrc
        }
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        this.setState({
            id: nextProps.id,
            name: nextProps.name,
            score: nextProps.score,
            imgSrc: nextProps.imgSrc
        })
    }

    render() {
        const {id, name, score, imgSrc} = this.state;
        return (
            <Route render={({match, history}) => {
                return (
                    <Card
                        className={"movie-preview-card"}
                        hoverable
                        cover={<img alt="example" src={imgSrc}/>}
                        onClick={() => {
                            history.push('/movie/' + id);
                        }}
                    >
                        <Meta title={name}/>
                        <Row style={{marginTop: '5px'}}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                {/* 10分制转5分制 四舍五入除以二 */}
                                <Rate disabled allowHalf value={
                                    typeof (score) === "undefined" ? 0 : Math.round(score) / 2
                                }/>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Text
                                    type="secondary">{
                                    typeof (score) === "undefined" ? "暂无评分" : score.toFixed(1)
                                }</Text>
                            </Col>
                        </Row>
                    </Card>
                )
            }}/>
        );

    }
}
