import React from "react";
import './CommentPreviewCard.css'
import {Card, Typography} from "antd";
import * as PropTypes from "prop-types";

const {Text} = Typography;
const {Meta} = Card;
export default class CommentPreviewCard extends React.Component {
    static propTypes = {
        // 基本跳转
        authorId: PropTypes.number,
        movieId: PropTypes.number,

        // 必填
        authorName: PropTypes.string,
        movieName: PropTypes.string,
        movieScore: PropTypes.number,
        editTime: PropTypes.string,
        commentTitle: PropTypes.string,
        commentContent: PropTypes.string,

        // 选填
        moviePic: PropTypes.string,
        authorPic: PropTypes.string,
    }

    render() {
        return (
            <div/>
        );

    }
}
