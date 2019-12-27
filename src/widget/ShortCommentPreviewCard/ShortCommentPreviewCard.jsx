import React from "react";
import './ShortCommentPreviewCard.css'
import {Avatar, Card, Col, Icon, Rate, Row, Tooltip, Typography} from "antd";
import * as PropTypes from "prop-types";

const {Text, Paragraph} = Typography;

export default class ShortCommentPreviewCard extends React.Component {
    static propTypes = {
        // 基本跳转信息
        movieId: PropTypes.number,
        commentId: PropTypes.number,
        // 基本信息
        authorName: PropTypes.string,
        movieName: PropTypes.string,
        movieScore: PropTypes.number,
        editTime: PropTypes.string,
        commentType: PropTypes.number,
        commentContent: PropTypes.string,

        // 选填
        withAuthorPicShow: PropTypes.bool,
        authorPic: PropTypes.string,
        withLike: PropTypes.bool,
        likeNumber: PropTypes.number,
        isLike: PropTypes.bool
    };


    constructor(props, context) {
        super(props, context);
        this.state = {
            likes: props.likeNumber,
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

    render() {
        const {likes, action} = this.state;
        return (
            <div className={"long_comment_preview_card"} style={{width: '100%'}}>
                <Card bordered={false} style={{width: "100%"}}>
                    <Row type="flex" justify="space-between">
                        <Col span={24}>
                            <Row type="flex" justify="start" align="middle" style={{padding: '0 0 10px 0'}}>
                                {this.props.withAuthorPicShow ?
                                    <Avatar src={this.props.authorPic} style={{margin: '0 10px 0 0'}}/>
                                    : null}
                                <Text type="secondary" style={{padding: '0'}}>{this.props.authorName}</Text>
                                {this.props.commentType === 0 ?
                                    <div>
                                        <Text style={{margin: '0 5px'}}>看过</Text>
                                        <Rate disabled allowHalf defaultValue={Math.round(this.props.movieScore) / 2}/>
                                    </div> :
                                    <div><Text type="secondary" style={{margin: '0 5px'}}>想看</Text></div>}

                                <Text type="secondary" style={{marginLeft: '5px'}}>{this.props.editTime}</Text>
                            </Row>
                            <Row>
                            </Row>
                            <Row>
                                <Paragraph ellipsis={{rows: 3, expandable: true}}>
                                    {this.props.commentContent}
                                </Paragraph>
                            </Row>
                            {this.props.withLike ?
                                <Row>
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
                                </Row> : null}
                        </Col>
                    </Row>
                </Card>
            </div>
        );

    }
}
