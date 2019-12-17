import React from "react";
import './MoviesDetail.css'
import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import PropTypes from 'prop-types';
import TitleBar from "../../widget/TitleBar/TitleBar";
import ColorThief from "../../utils/ColorThief";
import {Button, Card, Col, Descriptions, Divider, Icon, Popover, Progress, Rate, Row, Typography} from 'antd';
import LongCommentPreviewList from "../../widget/LongCommentPreviewList/LongCommentPreviewList";
import ShortCommentPreviewList from "../../widget/ShortCommentPreviewList/ShortCommentPreviewList";
import DiscussesList from "../../widget/DiscussesList/DiscussesList";
import Swiper from "swiper";
import 'swiper/css/swiper.css'
import StaffList from "../../widget/StaffList/StaffList";

const {Title, Paragraph, Text} = Typography;
const ButtonGroup = Button.Group;
const Element = BannerAnim.Element;

const pic = '/imgs/p2571762536.webp';
const content = '《终结者2：审判日》发生的27年后，由于未来天网派来T-800成功杀死年幼的约翰，以致令未来产生变化，一个全新进化的液态金属终结者从未来派出，目的是追杀持有关键讯息的丹妮·拉莫斯、半生化人葛蕾丝和她的朋友。这使莎拉·康纳以及成功杀死约翰的T800终结者前来帮助她们一行人，以共同为了人类的未来而战。'
const title = '终结者：黑暗命运'
const score = {
    star5: 9121,
    star4: 31232,
    star3: 32255,
    star2: 5421,
    star1: 692,
    comment_num: 78721
};
const totalScore = ((score.star5 * 10 + score.star4 * 8 + score.star3 * 6 + score.star2 * 4 + score.star1 * 2) / score.comment_num).toFixed(1);
const scoresList = [5, 4, 3, 2, 1];
const shortCommentList = [
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人1",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentType: 0,
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        likeNumber: 10,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人1",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentType: 1,
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        likeNumber: 12,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人1",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentType: 0,
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        likeNumber: 10,
    },
    {
        authorId: 1,
        movieId: 1,
        commentId: 1,
// 基本信息
        authorName: "评论人1",
        movieName: "电影名",
        movieScore: 8.0,
        editTime: "2019-11-23 16:28:30",
        commentType: 1,
        commentContent: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
        authorPic: "https://img3.doubanio.com/icon/u1881299-343.jpg",
        likeNumber: 12,
    },
];
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
        moviePic: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572847101.webp",
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
        moviePic: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572847101.webp",
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
        moviePic: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572847101.webp",
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
        moviePic: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572847101.webp",
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
        moviePic: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572847101.webp",
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
        moviePic: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572847101.webp",
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
        moviePic: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572847101.webp",
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
        moviePic: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572847101.webp",
        likeNumber: 10,
        dislikeNumber: 20,
        replyNumber: 8,
    },
];
const discussesList = [
    {
        discussID: 0,
        discussName: '讨论1',
        authorID: 0,
        authorName: '用户A',
        replyNum: 10,
        updateTime: '2019-11-23 16:28:30'
    },
    {
        discussID: 0,
        discussName: '讨论2',
        authorID: 0,
        authorName: '用户A',
        replyNum: 10,
        updateTime: '2019-11-23 16:28:30'
    },
    {
        discussID: 0,
        discussName: '讨论3',
        authorID: 0,
        authorName: '用户A',
        replyNum: 10,
        updateTime: '2019-11-23 16:28:30'
    },
    {
        discussID: 0,
        discussName: '讨论4',
        authorID: 0,
        authorName: '用户A',
        replyNum: 10,
        updateTime: '2019-11-23 16:28:30'
    }
]
const staffList = [
    {
        staffID: 0,
        staffName: '徐峥',
        staffPic: '/imgs/p49511.webp',
        staffWork: '导演'
    },
    {
        staffID: 1,
        staffName: '徐峥',
        staffPic: '/imgs/p49511.webp',
        staffWork: '编剧'
    }, {
        staffID: 2,
        staffName: '徐峥',
        staffPic: '/imgs/p49511.webp',
        staffWork: '演员'
    },
    {
        staffID: 3,
        staffName: '徐峥',
        staffPic: '/imgs/p49511.webp',
        staffWork: '演员'
    }, {
        staffID: 4,
        staffName: '徐峥',
        staffPic: '/imgs/p49511.webp',
        staffWork: '演员'
    }
]

export default class MoviesDetail extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'details-switch',
    };

    constructor(props) {
        super(props);
        this.state = {
            showInt: 0,
            delay: 0,
            imgAnim: [
                {translateX: [0, 300], opacity: [1, 0]},
                {translateX: [0, -300], opacity: [1, 0]},
            ],
        };
        this.oneEnter = false;
        this.palettes = [[
            "rgb(118, 65, 20)",
            "rgb(251, 227, 147)",
            "rgb(230, 166, 79)",
            "rgb(202, 117, 38)",
            "rgb(204, 184, 152)"
        ]]

        this.state = {
            palettes: this.palettes,
            isBannerHover: false,
            isButtonHover: false,
            windowWidth: window.innerWidth
        }

        this.colorThief = new ColorThief()
    }

    thiefPalette(index) {
        const data = this.colorThief.getPalette(this[`$img${index}`], 6);
        data.shift()
        const rgb = this.colorThief.convertColorRgb(data);
        this.palettes[index] = rgb
        this.setState({palettes: this.palettes})
    }

    onChange = () => {
        if (!this.oneEnter) {
            this.setState({delay: 300});
            this.oneEnter = true;
        }
    }

    getDuration = (e) => {
        if (e.key === 'map') {
            return 800;
        }
        return 1000;
    };

    onWindowResize = () => {
        this.setState({
            windowWidth: window.innerWidth
        });
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        let slidesPreView = 0;
        let slidesPerGroup = 1;
        if (this.state.windowWidth >= 1200) {
            slidesPreView = 3.25;
            slidesPerGroup = 1;
        } else if (this.state.windowWidth >= 768) {
            slidesPreView = 2.25;
            slidesPerGroup = 1;
        } else {
            slidesPreView = 1.25;
            slidesPerGroup = 1;
        }
        this.staffSwiper = new Swiper('.staffSwiper', {
            slidesPerView: slidesPreView,
            slidesPerGroup: slidesPerGroup,
            // freeMode: false,
            direction: 'horizontal',//竖向轮播
            // loop: false,
            navigation: {
                nextEl: '.staffSwiperNextButton',
                prevEl: '.staffSwiperPrevButton',
            },
        })
    }

    onMouseOverBannerAction = () => {
        this.setState({
            isBannerHover: true
        })
    };

    onMouseLeaveBannerAction = () => {
        this.setState({
            isBannerHover: false
        })
    };

    onMouseOverButtonAction = () => {
        this.setState({
            isButtonHover: true
        })
    };

    onMouseLeaveButtonAction = () => {
        this.setState({
            isButtonHover: false
        })
    };

    render() {
        return (
            <div className={"movies-details"}>
                <TitleBar key="a" title={"影片"}/>
                <div key="b" className={`${this.props.className}-wrapper`}
                     style={{background: this.state.palettes[0][0], zIndex: '0'}}>
                    <div className={this.props.className}>
                        <BannerAnim prefixCls={`${this.props.className}-img-wrapper`}
                                    sync type="across" duration={1000} ease="easeInOutExpo"
                                    arrow={false} thumb={false} onChange={this.onChange} dragPlay={false}
                                    ref={(c) => {
                                        this.bannerImg = c;
                                    }}
                        >
                            <Element key={0} style={{background: this.state.palettes[0][1], height: '100%',}}
                                     leaveChildHide>
                                <QueueAnim animConfig={this.state.imgAnim} duration={this.getDuration}
                                           delay={[this.state.delay, 0]} ease={['easeOutCubic', 'easeInQuad']}
                                           key="img-wrapper"
                                >
                                    <div className={`${this.props.className}-pic`} key="pic" style={{
                                        backgroundImage: 'url(' + pic + ')',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no repeat',
                                        backgroundSize: 'cover',
                                        width: '100%',
                                        height: '100%'
                                    }}/>
                                </QueueAnim>
                            </Element>
                        </BannerAnim>
                        <BannerAnim prefixCls={`${this.props.className}-text-wrapper`} sync type="across"
                                    duration={1000} arrow={false} thumb={false} ease="easeInOutExpo" dragPlay={false}
                                    ref={(c) => {
                                        this.bannerText = c;
                                    }}
                        >
                            <Element key={0}>
                                <QueueAnim type="bottom" duration={1000}
                                           delay={[this.state.delay + 500, 0]}>
                                    <div className={"movie-detail"} key={"1"}>
                                        <Title level={4}>{title}
                                            <span style={{color: "rgba(0,0,0,0.6)"}}> (2019)</span>
                                        </Title>
                                        <em style={{background: this.state.palettes[0][0]}}/>
                                        <Row style={{marginTop: '10px'}}>
                                            <Col xl={12} lg={24}>
                                                {this.state.windowWidth >= 576 ?
                                                    <Descriptions column={1}>
                                                        <Descriptions.Item label="类型">动作 / 科幻 / 冒险</Descriptions.Item>
                                                        <Descriptions.Item label="制片国家/地区">中国大陆</Descriptions.Item>
                                                        <Descriptions.Item label="上映日期">2019-11-01(美国/中国大陆) /
                                                            2019-10-23(法国)</Descriptions.Item>
                                                        <Descriptions.Item label="片长">128分钟</Descriptions.Item>
                                                        <Descriptions.Item label="又名">未来战士：黑暗命运(港) / 魔鬼终结者：黑暗宿命(台) /
                                                            终结者6：黑暗命运 /
                                                            终结者6：黑暗宿命 / 终结者2019 / 终结者6 / Terminator
                                                            6</Descriptions.Item>
                                                    </Descriptions> :
                                                    <Descriptions>
                                                        <Descriptions.Item>
                                                            中国大陆 / 动作 科幻 冒险 / 2019-11-01(美国/中国大陆)上映 2019-10-23(法国)上映 /
                                                            片长128分钟
                                                        </Descriptions.Item>
                                                    </Descriptions>}
                                            </Col>
                                            {this.state.windowWidth >= 1200 ?
                                                <Col xl={{span: 10, offset: 2}}>
                                                    <Card size="small"
                                                          actions={[
                                                              <div>
                                                                  <Icon type="heart" theme="filled"/>
                                                                  &nbsp;想看
                                                              </div>,
                                                              <div>
                                                                  <Icon type="star" theme="filled"/>
                                                                  &nbsp;看过
                                                              </div>,
                                                              <div>
                                                                  <Icon type="edit" theme="filled"/>
                                                                  &nbsp;写影评
                                                              </div>,
                                                          ]}>
                                                        <Row className={"score-total"} type="flex" justify="center"
                                                             align="middle" style={{padding: '10px'}}>
                                                            <Col xl={{span: 6, offset: 4}}>
                                                                <Title>{totalScore}</Title>
                                                            </Col>
                                                            <Col xl={{span: 12, offset: 1}}>
                                                                <Row>
                                                                    <Rate disabled allowHalf
                                                                          defaultValue={Math.round(totalScore) / 2}/>
                                                                </Row>
                                                                <Row>
                                                                    <Text>{score.comment_num}人评价</Text>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        {scoresList.map((number) => {
                                                            return (
                                                                <Row key={number} type="flex" justify="center"
                                                                     align="middle"
                                                                     style={{lineHeight: '15px', marginLeft: '-55px'}}>
                                                                    <Col className={"score-preview"}
                                                                         xxl={{span: 8}} xl={{span: 9}}
                                                                         style={{textAlign: "right"}}>
                                                                        <Rate disabled count={number}
                                                                              defaultValue={number}/>
                                                                    </Col>
                                                                    <Col xxl={{span: 11, offset: 1}}
                                                                         xl={{span: 11, offset: 1}}>
                                                                        <Progress
                                                                            status={"normal"}
                                                                            showInfo={this.state.windowWidth >= 1600}
                                                                            percent={parseFloat(((score['star' + number] / score.comment_num) * 100).toFixed(2))}/>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })}
                                                    </Card>
                                                </Col> : null}
                                        </Row>
                                    </div>
                                </QueueAnim>
                            </Element>
                        </BannerAnim>
                    </div>
                    <img style={{
                        width: '100%',
                        filter: "blur(30px)",
                        top: 0,
                        left: 0,
                        position: "absolute",
                        zIndex: -1000
                    }}
                         src={pic}
                         crossOrigin={"anonymous"}
                         ref={dom => {
                             this[`$img${0}`] = dom
                         }}
                         onLoad={() => this.thiefPalette(0)}
                    />
                </div>
                {this.state.windowWidth < 1200 ?
                    <div key={"b-small"} className={"mobile-score-board"}
                         style={{background: '#fff', padding: '20px 20px 1px 20px'}}>
                        <Row type="flex" justify="space-between" align="middle">
                            <Col span={12}>
                                <Title level={4}>{"影片评分"}</Title>
                            </Col>
                            <Col span={12} style={{textAlign: "right"}}>
                                <div>
                                    <Popover content={"想看"}>
                                        <Button shape="circle" style={{marginRight: '10px'}}>
                                            <Icon type="heart" theme="filled"/>
                                        </Button>
                                    </Popover>
                                    <Popover content={"看过"}>
                                        <Button shape="circle" style={{marginRight: '10px'}}>
                                            <Icon type="star" theme="filled"/>
                                        </Button>
                                    </Popover>
                                    <Popover content={"写影评"}>
                                        <Button shape="circle">
                                            <Icon type="edit" theme="filled"/>
                                        </Button>
                                    </Popover>
                                </div>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col xs={24} sm={6}>
                                <Row className={"score-total"} justify="center" align="middle"
                                     style={{padding: '10px'}}>
                                    <Col xs={12} sm={24} style={{
                                        textAlign: (this.state.windowWidth > 576) ? "left" : "center"
                                    }}>
                                        <Title>{totalScore}</Title>
                                    </Col>
                                    <Col xs={12} sm={24}>
                                        <Row>
                                            <Rate disabled allowHalf
                                                  defaultValue={Math.round(totalScore) / 2}
                                            />
                                        </Row>
                                        <Row>
                                            <Text>{score.comment_num}人评价</Text>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} sm={18} style={{verticalAlign: 'middle'}}>
                                {scoresList.map((number) => {
                                    return (
                                        <Row key={number} type="flex" justify="center"
                                             align="middle" style={{lineHeight: '15px', marginLeft: '-55px'}}>
                                            <Col className={"score-preview"}
                                                 xxl={{span: 8}} xl={{span: 9}}
                                                 xs={{span: 8}}
                                                 style={{textAlign: "right"}}>
                                                <Rate disabled count={number}
                                                      defaultValue={number}/>
                                            </Col>
                                            <Col xxl={{span: 11, offset: 1}}
                                                 xl={{span: 11, offset: 1}}
                                                 xs={{span: 11, offset: 1}}>
                                                <Progress
                                                    status={"normal"} showInfo={this.state.windowWidth > 576}
                                                    percent={parseFloat(((score['star' + number] / score.comment_num) * 100).toFixed(2))}/>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                        <Divider/>
                    </div> : null}
                <div key="c" style={{
                    background: '#fff',
                    padding: this.state.windowWidth >= 1200 ? '20px 20px 1px 20px' : '0px 20px 1px 20px'
                }}>
                    <Row type="flex" justify="space-between" align="middle">
                        <Col>
                            <Title level={4}>{title + " 的剧情简介"}</Title>
                        </Col>
                    </Row>
                    <Paragraph>
                        {content}
                    </Paragraph>
                    <Divider/>
                </div>
                <StaffList key="d" withTitle={true} title={title + " 的演职人员"} data={staffList}/>
                <ShortCommentPreviewList key="e" withTitle={true} title={title + " 的短评"} data={shortCommentList}
                                         withShowMoreButton={true}
                                         withLike={true}/>
                <LongCommentPreviewList key="f" withTitle={true} title={title + " 的长评"} data={longCommentList}
                                        withShowMoreButton={true}
                                        withAuthorPicShow={true}
                                        withLikeOrDisLike={true}/>
                <DiscussesList key="g" withTitle={true} title={title + " 的讨论区"} data={discussesList}
                               isLastNode={true}/>
            </div>
        );
    }
}
