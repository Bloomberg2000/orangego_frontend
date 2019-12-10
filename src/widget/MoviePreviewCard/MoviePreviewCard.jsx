import React from "react";
import './MoviePreviewCard.css'
import {Card, Col, Rate, Row, Typography} from "antd";
import * as PropTypes from "prop-types";

const {Text} = Typography;
const {Meta} = Card;
export default class MoviePreviewCard extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        score: PropTypes.number,
        imgSrc: PropTypes.string
    };

    render() {
        const {name, score, imgSrc} = this.props;
        return (
            <Card
                className={"movie-preview-card"}
                hoverable
                cover={<img alt="example" src={imgSrc}/>}
            >
                <Meta title={name}/>
                <Row style={{marginTop: '5px'}}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={15}>
                        {/* 10分制转5分制 四舍五入除以二 */}
                        <Rate disabled allowHalf defaultValue={Math.round(score) / 2}/>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={9}>
                        <Text type="secondary">{score}</Text>
                    </Col>
                </Row>
            </Card>
        );

    }
}
