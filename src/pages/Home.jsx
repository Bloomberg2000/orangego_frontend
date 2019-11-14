import React from "react";
import {Breadcrumb, Icon, Layout, Menu} from 'antd';
import "./Home.css"
import OrangeGoLogo from "../images/logo.svg";

const {Header, Content, Footer, Sider} = Layout;
export default class Home extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">
                        {/*<img className="logo-img" src={require("../images/logo.svg")} alt="logo"/>*/}
                        <Icon component={OrangeGoLogo}/>
                        {!this.state.collapsed ? <span className="logo-text">OrangeGo</span> : null}
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="home"/>
                            <span>主页</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop"/>
                            <span>院线热映</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="user"/>
                            <span>选电影</span></Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="team"/>
                            <span>排行榜</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="file"/>
                            <span>分类</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="file"/>
                            <span>影评</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                < Layout>
                    <Header style={{background: '#fff', padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>Bill is a cat.</div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant
                        Design ©2018
                        Created
                        by
                        Ant
                        UED
                    </Footer>
                </Layout>
            </Layout>
        )
            ;
    }
}
