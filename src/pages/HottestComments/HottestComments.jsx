import React from "react";
import QueueAnim from "rc-queue-anim";
import TitleBar from "../../widget/TitleBar/TitleBar";
import LongCommentList from "../../widget/LongCommentList/LongCommentList";

const longCommentList = [
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人1",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentTitle: "评论标题",
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        moviePic: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p689520756.webp",
        likeNumber: 10,
        dislikeNumber: 20,
        replyNumber: 8,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人2",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentTitle: "评论标题",
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        moviePic: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p689520756.webp",
        likeNumber: 10,
        dislikeNumber: 20,
        replyNumber: 8,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人3",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentTitle: "评论标题",
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        moviePic: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p689520756.webp",
        likeNumber: 10,
        dislikeNumber: 20,
        replyNumber: 8,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人4",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentTitle: "评论标题",
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        moviePic: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p689520756.webp",
        likeNumber: 10,
        dislikeNumber: 20,
        replyNumber: 8,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人5",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentTitle: "评论标题",
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        moviePic: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p689520756.webp",
        likeNumber: 10,
        dislikeNumber: 20,
        replyNumber: 8,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人6",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentTitle: "评论标题",
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        moviePic: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p689520756.webp",
        likeNumber: 10,
        dislikeNumber: 20,
        replyNumber: 8,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人7",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentTitle: "评论标题",
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        moviePic: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p689520756.webp",
        likeNumber: 10,
        dislikeNumber: 20,
        replyNumber: 8,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人8",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentTitle: "评论标题",
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        moviePic: "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p689520756.webp",
        likeNumber: 10,
        dislikeNumber: 20,
        replyNumber: 8,
    },
];

export default class HottestComments extends React.Component {
    render() {
        return (
            <div id="home">
                <QueueAnim delay={300}>
                    <TitleBar key="a" title={"影评"}/>
                    <LongCommentList key="b" withTitle={true} title={"最受欢迎的影评"}
                                     data={longCommentList}
                                            isFirstNode={true}
                                            isLastNode={true}
                                            withMoviePicShow={true}
                                            withAuthorPicShow={true}
                                            withLikeOrDisLike={true}
                                            showPagination={false}/>
                </QueueAnim>
            </div>);
    }
}
