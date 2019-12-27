import React from "react";
import TitleBar from "../../widget/TitleBar/TitleBar";
import Loading from "../../widget/Loading/Loading";
import axios from "axios";
import Error from "../../widget/Error/Error";
import {Avatar, Card, Col, Comment, List, Row, Typography} from "antd";
import './DiscussesDetail.css'

const {Title, Text} = Typography;
export default class DiscussesDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discussId: props.match.params.id,
            discussData: {},
            hasError: false,
        }
    }

    componentDidMount() {
        const that = this;
        window.addEventListener('resize', this.onWindowResize);
        axios.get("/api/discusses/" + this.state.discussId).then(
            res => {
                if (!res.data.hasOwnProperty('replies')) {
                    that.setState({
                        hasError: true
                    });
                }
                that.setState({
                    discussData: res.data,
                });
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }

    render() {
        if (this.state.hasError) {
            return (
                <Error content={"出错了，未找到相关评论。"}/>
            )
        }
        if (!this.state.discussData.hasOwnProperty('replies')) {
            return (
                <div style={{height: '100%'}}>
                    <TitleBar key="a" title={"影评"}/>
                    <Loading/>
                </div>
            )
        }
        const discussData = this.state.discussData;
        const replyNum = this.state.discussData.replyNum;
        const replyList = this.state.discussData.replies;
        for (let i in replyList) {
            let content;
            if (replyList[i].hasOwnProperty("parent")) {
                content = [
                    <div key={i} className={"reply-info"}>
                        <blockquote>
                            {replyList[i].parent.replyContent}
                        </blockquote>
                        {replyList[i].replyContent}
                    </div>
                ]
            } else {
                content = replyList[i].replyContent
            }
            replyList[i]['content'] = content;
        }
        return (<div id="home">
            <TitleBar key="a" title={"讨论区"}/>
            {this.state.data === null ?
                <div style={{height: '100%'}}>
                    <Loading/>
                </div> :
                <div>
                    <Card bordered={false} style={{width: "100%"}}>
                        <Row type="flex" justify="space-between">
                            <Col>
                                <Row>
                                    <Title level={3}>{discussData.discussesContent}</Title>
                                </Row>
                            </Col>
                        </Row>
                        <Row type="flex" justify="start" align="middle" style={{padding: '5px 0'}}>
                            <Avatar src={discussData.userAvatar} style={{margin: '0 10px 0 0'}}/>
                            <Text type="secondary" style={{padding: '3px'}}>{discussData.userName}</Text>
                            <Text type="secondary" style={{margin: '0 5px'}}>发起讨论</Text>
                            <a href={"/movie/" + discussData.movieId}>{discussData.movieName}</a>
                            <Text type="secondary" style={{marginLeft: '5px'}}>{discussData.discussesCreateTime}</Text>
                        </Row>
                    </Card>
                    <div style={{
                        background: '#fff',
                        padding: '10px 31px',
                    }}>
                        <List
                            className="comment-list"
                            header={`${replyNum} 条回复`}
                            itemLayout="horizontal"
                            dataSource={replyList}
                            renderItem={item => (
                                <li>
                                    <Comment
                                        actions={[<span key="replay">回复</span>]}
                                        author={item.userName}
                                        avatar={item.userAvatar}
                                        content={item.content}
                                        datetime={item.replyCreateTime}
                                    />
                                </li>
                            )}
                        />
                    </div>
                </div>}
        </div>)
    }
}
