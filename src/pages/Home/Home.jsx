import React from "react";
import {Button, Col, Icon, Input, Layout, Menu, Row} from 'antd';
import {enquireScreen} from 'enquire-js';
import {Link} from "react-router-dom";
import "./Home.css"
import OrangeGoLogo from "../../images/logo.svg";
import Animate from 'rc-animate';


const {Search} = Input;
const {Header, Content, Footer, Sider} = Layout;
const OrangoGoIcon = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1510677_jqa56lk9e5.js', // 在 iconfont.cn 上生成
});

const SearchBar = (<div><Search placeholder="搜索电影/影人"/></div>);

export default class Home extends React.Component {
    state = {
        collapsed: true,
        searchBarShow: false,
        isMobile: false,
    };

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
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
                <Sider breakpoint="sm" collapsedWidth="0" collapsible collapsed={this.state.collapsed}
                       onCollapse={this.onCollapse}>
                    <div className="logo">
                        <img className="logo-img" src={OrangeGoLogo} alt="logo"/>
                        {!this.state.collapsed ? <span className="logo-text">OrangeGo</span> : null}
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['home']} mode="inline">
                        <Menu.Item key="home">
                            <Icon type="home"/>
                            <span>主页</span>
                            <Link to="/"/>
                        </Menu.Item>
                        <Menu.Item key="cinema">
                            <OrangoGoIcon type="icon-cinema"/>
                            <span>院线热映</span>
                            <Link to="/"/>
                        </Menu.Item>
                        <Menu.Item key="movies">
                            <OrangoGoIcon type="icon-movies"/>
                            <span>选电影</span>
                            <Link to="/"/>
                        </Menu.Item>
                        <Menu.Item key="ranking">
                            <OrangoGoIcon type="icon-ranking"/>
                            <span>排行榜</span>
                            <Link to="/"/>
                        </Menu.Item>
                        <Menu.Item key="category">
                            <OrangoGoIcon type="icon-category"/>
                            <span>分类</span>
                            <Link to="/"/>
                        </Menu.Item>
                        <Menu.Item key="comment">
                            <OrangoGoIcon type="icon-comment"/>
                            <span>影评</span>
                            <Link to="/"/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Row type="flex" justify="space-between">
                            <Col xs={{span: 2, offset: 0}} sm={{span: 4, offset: 0}}
                                 md={{span: 6, offset: 0}} lg={{span: 8, offset: 0}}>
                                {this.state.collapsed ?
                                    <div className="logo">
                                        <img className="logo-img" src={OrangeGoLogo} alt="logo"/>
                                        <span className="logo-text-outside">
                                        OrangeGo&nbsp;<span className="logo-text-outside-lighter">Movies</span>
                                    </span>
                                    </div>
                                    : null}
                            </Col>
                            {/*大屏幕*/}
                            {this.state.isMobile ?
                                <Col xs={2} sm={2}>
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
                        <Animate
                            component=""
                            transitionName="fade"
                        >
                            {this.state.isMobile && this.state.searchBarShow ?
                                <Row style={{background: '#fff', padding: 0}}>
                                    <Col xs={{span: 22, offset: 2}} sm={{span: 22, offset: 2}}>{SearchBar}</Col>
                                </Row> : null
                            }
                        </Animate>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        {this.props.children}
                        {/*    <Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*        <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                        {/*        <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                        {/*    </Breadcrumb>*/}
                        {/*    <div style={{padding: 24, background: '#fff', minHeight: 360}}>Bill is a cat.</div>*/}
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Copyright © 2019 OrangeGo Corporation. All rights reserved.
                    </Footer>
                </Layout>
            </Layout>
        )
            ;
    }
}
