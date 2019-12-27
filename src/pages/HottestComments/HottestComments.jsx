import React from "react";
import QueueAnim from "rc-queue-anim";
import TitleBar from "../../widget/TitleBar/TitleBar";
import LongCommentPreviewList from "../../widget/LongCommentPreviewList/LongCommentPreviewList";
import axios from "axios";


export default class HottestComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotLongCommentListTotal: 0,
            hotLongCommentList: null
        }
    }

    componentDidMount() {
        this.getHotLongCommentData();
    }

    getHotLongCommentData() {
        axios.get("/api/longComments/hot").then(
            res => {
                let longCommentList = [];
                let i = 0;
                for (let comment of res.data.comments) {
                    longCommentList.push({
                        key: i++,
                        movieId: comment.comments.movieid,
                        commentId: comment.comments.longcommentsid,
                        // 基本信息
                        authorName: comment.comments.username,
                        movieName: comment.comments.moviename,
                        movieScore: comment.comments.score * 2,
                        editTime: comment.comments.createtimedate,
                        commentTitle: comment.comments.longcommentstitle,
                        commentContent: comment.comments.longcommentscontent,
                        authorPic: comment.comments.useravatar,
                        moviePic: comment.comments.moviecover,
                        likeNumber: comment.longcommentslikenum,
                        dislikeNumber: comment.longcommentsunlikenum,
                        likeType: comment.likeType
                    })
                }
                console.log(longCommentList);
                this.setState({
                    hotLongCommentListLoading: true,
                    hotLongCommentListTotal: longCommentList.length,
                    hotLongCommentList: longCommentList,
                })
            }
        )
    }
    render() {
        return (
            <div id="home">
                <QueueAnim delay={300}>
                    <TitleBar key="a" title={"最受欢迎的影评"}/>
                    <LongCommentPreviewList key="e"
                                            data={this.state.hotLongCommentList}
                                            total={this.state.hotLongCommentListTotal}
                                            pageSize={50}
                                            isFirstNode={true}
                                            isLastNode={true}
                                            withPagination={false}
                                            withMoviePicShow={true}/>
                </QueueAnim>
            </div>);
    }
}
