import React from "react";
import './TitleBar.css'
import {Col, Row, Typography} from "antd";
import * as PropTypes from "prop-types";
import {enquireScreen} from "enquire-js";
import LogInOrSignInModal from "../LogInOrSignInModal/LogInOrSignInModal";

const {Title} = Typography;
export default class TitleBar extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        withUserAvatar: PropTypes.bool
    };
    static defaultProps = {
        withUserAvatar: true
    };
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
                {this.props.withUserAvatar ?
                    <Row type="flex" justify="space-around" align="middle">
                        <Col xs={21} md={23}>
                            <Title level={2}>{title}</Title>
                        </Col>
                        <Col xs={3} md={1}>
                            {/*<Route render={({match, history}) => {*/}
                            {/*    return (*/}
                            {/*        <Badge count={"登录"}>*/}
                            {/*            <Avatar style={{margin: "0 0 0.75em 0.6em"}} size={32} icon="user"*/}
                            {/*              -p      onClick={() => {*/}
                            {/*                        history.push('/login');*/}
                            {/*                    }}/>*/}
                            {/*        </Badge>*/}
                            {/*    )*/}
                            {/*}}/>*/}
                            <LogInOrSignInModal/>
                        </Col>
                    </Row> :
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={24}>
                            <Title level={2}>{title}</Title>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}
