import React from "react";
import TitleBar from "../../widget/TitleBar/TitleBar";
import Loading from "../../widget/Loading/Loading";
import axios from "axios";
import Error from "../../widget/Error/Error";
import LongCommentCard from "../../widget/LongCommentCard/LongCommentCard";
import {Comment, List} from "antd";
import './LongCommentDetail.css'

export default class LongCommentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            longCommentId: props.match.params.id,
            longCommentData: {},
            hasError: false,
        }
    }

    componentDidMount() {
        const that = this;
        window.addEventListener('resize', this.onWindowResize);
        axios.get("/api/longComments/" + this.state.longCommentId).then(
            res => {
                if (!res.data.hasOwnProperty('comments')) {
                    that.setState({
                        hasError: true
                    });
                }
                that.setState({
                    longCommentData: res.data,
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
        if (!this.state.longCommentData.hasOwnProperty('comments')) {
            return (
                <div style={{height: '100%'}}>
                    <TitleBar key="a" title={"影评"}/>
                    <Loading/>
                </div>
            )
        }
        const comment = this.state.longCommentData.comments;
        const replyList = this.state.longCommentData.replies;
        const replyNum = this.state.longCommentData.replyNum;
        const likeType = this.state.longCommentData.likeType;
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
            <TitleBar key="a" title={"影评"}/>
            {this.state.data === null ?
                <div style={{height: '100%'}}>
                    <Loading/>
                </div> :
                <div>
                    <LongCommentCard
                        movieId={comment.movieid}
                        commentId={comment.longcommentsid}
                        authorName={comment.username}
                        movieName={comment.moviename}
                        movieScore={comment.score * 2}
                        editTime={comment.createtimedate}
                        commentTitle={comment.longcommentstitle}
                        commentContent={comment.longcommentscontent}
                        authorPic={comment.useravatar}
                        moviePic={comment.moviecover}
                        likeNumber={comment.longcommentslikenum}
                        dislikeNumber={comment.longcommentsunlikenum}
                        likeType={likeType}
                    />
                    <div style={{
                        background: '#fff',
                        padding: '24px',
                        marginTop: '2px'
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
