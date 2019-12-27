import React from "react";
import './LongCommentCard.css'
import {Avatar, Card, Col, Icon, Rate, Row, Tooltip, Typography} from "antd";
import * as PropTypes from "prop-types";
import {Route} from "react-router";

const {Text, Paragraph, Title} = Typography;

export default class LongCommentCard extends React.Component {
    static propTypes = {
        // 基本跳转信息
        movieId: PropTypes.number,
        commentId: PropTypes.number,
        // 基本信息
        authorName: PropTypes.string,
        movieName: PropTypes.string,
        movieScore: PropTypes.number,
        editTime: PropTypes.string,
        commentTitle: PropTypes.string,
        commentContent: PropTypes.string,
        // 选填
        authorPic: PropTypes.string,
        moviePic: PropTypes.string,
        likeNumber: PropTypes.number,
        dislikeNumber: PropTypes.number,
        likeType: PropTypes.number
    };


    constructor(props, context) {
        super(props, context);
        this.state = {
            likes: props.likeNumber,
            dislikes: props.dislikeNumber,
            reply: props.replyNumber,
            action: null
        }
    }

    like = () => {
        this.setState({
            likes: this.props.likeNumber + 1,
            dislikes: this.props.dislikeNumber,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: this.props.likeNumber,
            dislikes: this.props.dislikeNumber + 1,
            action: 'disliked',
        });
    };

    render() {
        const {likes, dislikes, action} = this.state;
        return (
            <div className={"long_comment_card"} style={{width: '100%'}}>
                <Card bordered={false} style={{width: "100%"}}>
                    <Row type="flex" justify="space-between">
                        <Col xs={19} md={21} xl={22} style={{padding: '0 10px 0'}}>
                            <Row>
                                <Title level={3}>{this.props.commentTitle}</Title>
                            </Row>
                            <Row type="flex" justify="start" align="middle" style={{padding: '5px 0'}}>
                                <Avatar src={this.props.authorPic} style={{margin: '0 10px 0 0'}}/>
                                <Text type="secondary" style={{padding: '3px'}}>{this.props.authorName}</Text>
                                <Text type="secondary" style={{margin: '0 5px'}}>评论</Text>
                                <a href={"/movie/" + this.props.movieId}>{this.props.movieName}</a>
                                <Rate disabled allowHalf style={{marginLeft: '10px', marginBottom: '1px'}}
                                      defaultValue={Math.round(this.props.movieScore) / 2}/>
                                <Text type="secondary" style={{marginLeft: '5px'}}>{this.props.editTime}</Text>
                            </Row>
                        </Col>
                        {/*<Route render={({match, history}) => {*/}
                        {/*    return (*/}
                        {/*        <Col xs={5} md={3} xl={2}>*/}
                        {/*            <div className="movie-pic"*/}
                        {/*                 style={{*/}
                        {/*                     backgroundImage: 'url(' + this.props.moviePic + ')',*/}
                        {/*                     backgroundPosition: 'top right',*/}
                        {/*                     backgroundRepeat: 'no-repeat',*/}
                        {/*                     backgroundSize: 'contain'*/}
                        {/*                 }}*/}
                        {/*                 onClick={() => {*/}
                        {/*                     history.push("/movie/" + this.props.movieId);*/}
                        {/*                 }}/>*/}
                        {/*        </Col>*/}
                        {/*    )*/}
                        {/*}}/>*/}
                        <Col span={24}  style={{padding: '10px'}}>
                            <div dangerouslySetInnerHTML={{
                                __html: this.props.commentContent
                            }}/>
                        </Col>
                        <Col span={24} style={{padding: '10px'}}>
                                <span key="comment-basic-like">
                                    <Tooltip title="有用">
                                      <Icon
                                          type="like"
                                          theme={action === 'liked' ? 'filled' : 'outlined'}
                                          onClick={this.like}
                                      />
                                    </Tooltip>
                                    <span style={{paddingLeft: 8, cursor: 'auto'}}>{likes}</span>
                                 </span>
                            <span key='comment-basic-dislike' style={{paddingLeft: '10px'}}>
                                    <Tooltip title="没用">
                                      <Icon
                                          type="dislike"
                                          theme={action === 'disliked' ? 'filled' : 'outlined'}
                                          onClick={this.dislike}
                                      />
                                    </Tooltip>
                                <span style={{paddingLeft: 6, cursor: 'auto'}}>{dislikes}</span>
                              </span>
                        </Col>
                    </Row>
                </Card>
            </div>
        );

    }
}
