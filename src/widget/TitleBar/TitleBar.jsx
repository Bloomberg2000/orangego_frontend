import React from "react";
import './TitleBar.css'
import {Col, Row, Typography} from "antd";
import * as PropTypes from "prop-types";

const {Title} = Typography;
export default class TitleBar extends React.Component {
    static propTypes = {
        title: PropTypes.string,
    }
    render() {
        const {title} = this.props;
        return (
            <div id="TitleBar" style={{background: '#fff', padding: '10px 30px 0 60px'}}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <Title level={2}>{title}</Title>
                    </Col>
                </Row>
            </div>
        );
    }
}
