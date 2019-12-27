import React from "react";
import './LongCommentPreviewList.css'
import {Button, Col, Divider, List, Pagination, Row, Typography} from "antd";
import * as PropTypes from "prop-types";
import LongCommentPreviewCard from "../LongCommentPreviewCard/LongCommentPreviewCard";
import Loading from "../Loading/Loading";
import {Route} from "react-router";

const {Title} = Typography;

export default class LongCommentPreviewList extends React.Component {
    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        withTitle: PropTypes.bool,
        withShowMoreButton: PropTypes.bool,
        ShowMoreHref: PropTypes.string,
        // 选填
        withAuthorPicShow: PropTypes.bool,
        withMoviePicShow: PropTypes.bool,
        withLikeOrDisLike: PropTypes.bool,
        withPagination: PropTypes.bool,
        title: PropTypes.string,
        data: PropTypes.array,
        total: PropTypes.number,
        pageSize: PropTypes.number
    };

    static defaultProps = {
        isLastNode: false,
        isFirstNode: false,
        withShowMoreButton: false,
        withAuthorPicShow: false,
        withMoviePicShow: false,
        withLikeOrDisLike: false,
        withPagination: true
    };

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            total: this.props.total,
            pageSize: this.props.pageSize,
            currentPage: 1,
            dataArray: [],
        };
    }

    getPageSize = () => {
        return this.props.pageSize;
    };

    getData() {
        if (this.state.data === null) {
            return;
        }
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

    componentDidMount() {
        this.setState({pageSize: this.getPageSize()}, () => this.getData());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.total !== this.props.total) {
            this.setState({pageSize: this.getPageSize()}, () => this.getData());
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            total: nextProps.total
        });
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
                        {withShowMoreButton ?
                            <Col>
                                <Route render={({match, history}) => {
                                    return (
                                        <Button type="link" onClick={() => {
                                            history.push(this.props.ShowMoreHref)
                                        }}>
                                            查看更多 >
                                        </Button>
                                    )
                                }}/>
                            </Col> : null}
                    </Row> : null}
                {this.state.data === null ?
                    <div style={{height: '100%'}}>
                        <Loading/>
                    </div> :
                    <div>
                        <List itemLayout="horizontal"
                              dataSource={this.state.dataArray}
                              renderItem={item => (
                                  <List.Item key={item.key} style={{padding: '5px'}}>
                                      <LongCommentPreviewCard
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
                                          likeType={item.likeType}
                                      />
                                  </List.Item>
                              )}
                        />
                        {this.props.withPagination ?
                            <Row type="flex" justify="end">
                                <Col>
                                    <Pagination simple
                                                defaultCurrent={1}
                                                pageSize={this.state.pageSize}
                                                total={this.state.total}
                                                onChange={(page, pageSize) => {
                                                    this.setState({currentPage: page}, () => this.getData())
                                                }}/>
                                </Col>
                            </Row> : null}
                    </div>}
                {!isLastNode ? <Divider/> : <div style={{margin: '20px'}}/>}
            </div>
        );
    }
}
