import React from "react";
import {Button, Col, Icon, Input, Layout, Menu, Row} from 'antd';
import {enquireScreen} from 'enquire-js';
import {Link, withRouter} from "react-router-dom";
import "./App.css"
import OrangeGoLogo from "./images/logo.svg";
import Animate from 'rc-animate';


const {Search} = Input;
const {Header, Content, Footer, Sider} = Layout;

// iconfont在线图标
const OrangoGoIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1510677_jqa56lk9e5.js', // 在 iconfont.cn 上生成
});

// 搜索栏
const SearchBar = (<div><Search placeholder="搜索电影/影人" style={{background: '#fff'}}/></div>);

class App extends React.Component {
    state = {
        collapsed: true,
        searchBarShow: false,
        isMobile: false,
    };

    // 监测屏幕变化
    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
                searchBarShow: !b
            });
        });
    }

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    handleSearchBarShow() {
        this.setState({
            searchBarShow: !this.state.searchBarShow
        });
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider breakpoint={this.state.isMobile ? 'sm' : '-'}
                       collapsedWidth={this.state.isMobile ? '0' : '80'}
                       collapsible
                       collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse} style={{zIndex: 1000}}>
                    <div className="logo">
                        <img className="logo-img" src={OrangeGoLogo} alt="logo"/>
                        {/* 收起时Sider后不显示品牌名 */}
                        <Animate
                            component=""
                            transitionName="fade"
                        >
                            {!this.state.collapsed ? <span className="logo-text">OrangeGo</span> : null}
                        </Animate>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['/home']} mode="inline"
                          selectedKeys={[this.props.history.location.pathname]}>
                        <Menu.Item key="/home">
                            <Icon type="heart"/>
                            <span>为您推荐</span>
                            <Link to="/home"/>
                        </Menu.Item>
                        <Menu.Item key="/theatricalLine">
                            <OrangoGoIcon type="icon-cinema"/>
                            <span>院线热映</span>
                            <Link to="/theatricalLine"/>
                        </Menu.Item>
                        <Menu.Item key="/moviesList">
                            <OrangoGoIcon type="icon-movies"/>
                            <span>选电影</span>
                            <Link to="/"/>
                        </Menu.Item>
                        <Menu.Item key="/ranking">
                            <OrangoGoIcon type="icon-ranking"/>
                            <span>排行榜</span>
                            <Link to="/"/>
                        </Menu.Item>
                        <Menu.Item key="/comment">
                            <OrangoGoIcon type="icon-comment"/>
                            <span>影评</span>
                            <Link to="/"/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Row type="flex" justify="space-between">
                            {/* 当Sider收起时，在此处显示品牌名 */}
                            <Col xs={{span: 2, offset: 0}} sm={{span: 4, offset: 0}}
                                 md={{span: 6, offset: 0}} lg={{span: 8, offset: 0}}>
                                <Animate
                                    component=""
                                    transitionName="fade"
                                >
                                    {this.state.collapsed ?
                                        <div className="logo">
                                            {this.state.isMobile ?
                                                <img className="logo-img" src={OrangeGoLogo} alt="logo"/> : null}
                                            <span className="logo-text-outside" style={{margin:(this.state.isMobile)?"":"4px"}}>
                                        OrangeGo&nbsp;<span className="logo-text-outside-lighter">Movies</span>
                                    </span>
                                        </div>
                                        : null}
                                </Animate>
                            </Col>
                            {/* 移动设备显示搜索按钮，非移动设备显示搜索栏 */}
                            {this.state.isMobile ?
                                <Col xs={3} sm={3}>
                                    {!this.state.searchBarShow ?
                                        <Button shape="circle" icon="search"
                                                onClick={() => this.handleSearchBarShow()}/> :
                                        <Button shape="circle" icon="close" onClick={() => this.handleSearchBarShow()}/>
                                    }
                                </Col> :
                                <Col sm={{span: 12, offset: 8}} md={{span: 10, offset: 8}} lg={{span: 10, offset: 6}}>
                                    {SearchBar}
                                </Col>
                            }
                        </Row>
                        {/* 是移动设备根据是否点击按钮进行搜素框的出现动画 */}
                        <Animate
                            component=""
                            transitionName="fade"
                        >
                            {this.state.isMobile && this.state.searchBarShow ?
                                <Row style={{background: '#fff', padding: 0, zIndex: 999}}>
                                    <Col xs={{span: 22, offset: 2}} sm={{span: 22, offset: 2}}>{SearchBar}</Col>
                                </Row> : null
                            }
                        </Animate>
                    </Header>
                    <Content>
                        {this.props.children}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Copyright © 2019 OrangeGo Corporation. All rights reserved.
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

// 导航栏
export const AppWithRouter = withRouter(App);

