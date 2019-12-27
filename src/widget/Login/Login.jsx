import React from "react";
import {Typography} from 'antd';
import './Login.css'
import {WrappedLoginForm} from "../../widget/LoginForm/LoginForm";

const {Title} = Typography;

export default class Login extends React.Component {
    render() {
        return (
            <div className="login-page-wrapper">
                <div className="page">
                    <Title level={2}>登录</Title>
                    <div style={{marginTop:'20px'}}>
                        <WrappedLoginForm/>
                    </div>
                </div>
            </div>
        );
    }
}

