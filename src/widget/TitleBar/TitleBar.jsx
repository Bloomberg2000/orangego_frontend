import React from "react";
import './TitleBar.css'
import {Col, Row, Typography} from "antd";
import * as PropTypes from "prop-types";
import {enquireScreen} from "enquire-js";

const {Title} = Typography;
export default class TitleBar extends React.Component {
    static propTypes = {
        title: PropTypes.string,
    }

    state = {
        isMobile: false,
    };

    // 监测屏幕变化
    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });
        });
    }

    render() {
        const {title} = this.props;
        return (
            <div id="TitleBar"
                 style={{background: '#fff', padding: (this.state.isMobile) ? '10px 20px 0 60px' : '10px 20px 0 20px'}}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <Title level={2}>{title}</Title>
                    </Col>
                </Row>
            </div>
        );
    }
}
