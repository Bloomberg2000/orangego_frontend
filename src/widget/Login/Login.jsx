import React from "react";
import QueueAnim from "rc-queue-anim";
import {Col, Typography} from 'antd';
import './Login.css'
import {WrappedLoginForm} from "../../widget/LoginForm/LoginForm";

const {Title} = Typography;

export default class Login extends React.Component {
    render() {
        return (
            <div className="login-page-wrapper login-page" id="page2">
                <div className="page">
                    <QueueAnim
                        component={Col}
                        componentProps={{xs: 24}}
                        className="page2-product"
                        key="right"
                        type="bottom"
                        leaveReverse
                    >
                        <Title level={2}>立即登录</Title>
                        <div style={{marginTop: '20px'}}>
                            <WrappedLoginForm/>
                        </div>
                    </QueueAnim>
                </div>
            </div>
        );
    }
}

