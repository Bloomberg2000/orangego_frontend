import React from "react";
import './LongCommentList.css'
import {Col, Divider, List, Pagination, Row, Typography} from "antd";
import * as PropTypes from "prop-types";
import LongCommentPreviewCard from "../LongCommentPreviewCard/LongCommentPreviewCard";

const {Title} = Typography;

export default class LongCommentList extends React.Component {
    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        withTitle: PropTypes.bool,
        // 选填
        withAuthorPicShow: PropTypes.bool,
        withMoviePicShow: PropTypes.bool,
        withLikeOrDisLike: PropTypes.bool,
        title: PropTypes.string,
    };

    static defaultProps = {
        isLastNode: false,
        isFirstNode: false,
        withAuthorPicShow: false,
        withMoviePicShow: false,
        withLikeOrDisLike: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            total: this.props.data.length,
            pageSize: 0,
            currentPage: 1,
            dataArray: [],
            selectedTags: [],
        };
    }

    getData() {
        let page = this.state.currentPage;
        let pageSize = this.state.pageSize;
        if (page * pageSize <= this.state.total) {
            this.setState({
                dataArray: this.props.data.slice((page - 1) * pageSize, (page * pageSize))
            })
        } else {
            this.setState({
                dataArray: this.props.data.slice(-pageSize)
            })
        }
    }


    render() {
        const {isFirstNode, isLastNode, withTitle, withShowMoreButton, title} = this.props;
        return (
            <div id="CommentList"
                 style={{
                     background: '#fff',
                     padding: (isFirstNode === true) ? '20px 20px 1px 20px' : '0px 20px 1px 20px'
                 }}>
                {withTitle ?
                    <Row type="flex" justify="space-between" align="middle">
                        <Col>
                            <Title level={4}>{title}</Title>
                        </Col>
                    </Row> : null}
                <List itemLayout="horizontal"
                      dataSource={this.state.dataArray}
                      renderItem={item => (
                          <List.Item key={item.key} style={{padding: '5px'}}>
                              <LongCommentPreviewCard
                                  authorId={item.authorId}
                                  movieId={item.movieId}
                                  commentId={item.commentId}
                                  authorName={item.authorName}
                                  movieName={item.movieName}
                                  movieScore={item.movieScore}
                                  editTime={item.editTime}
                                  commentTitle={item.commentTitle}
                                  commentContent={item.commentContent}
                                  withAuthorPicShow={this.props.withAuthorPicShow}
                                  authorPic={item.authorPic}
                                  withMoviePicShow={this.props.withMoviePicShow}
                                  moviePic={item.moviePic}
                                  withLikeOrDisLike={this.props.withLikeOrDisLike}
                                  likeNumber={item.likeNumber}
                                  dislikeNumber={item.dislikeNumber}
                                  replyNumber={item.replyNumber}
                              />
                          </List.Item>
                      )}
                />
                <Row type="flex" justify="end">
                    <Col>
                        <Pagination
                            showSizeChanger
                            onChange={(page, pageSize) => {
                                this.setState({currentPage: page, pageSize: pageSize})
                            }}
                            onShowSizeChange={(current, pageSize) => {
                                this.setState({pageSize: pageSize})
                            }}
                            pageSizeOptions={['5', '10', '20', '30', '40']}
                            defaultCurrent={1}
                            total={this.state.total}
                        />
                    </Col>
                </Row>
                {!isLastNode ? <Divider/> : <div style={{margin: '20px'}}/>}
            </div>
        );
    }
}
