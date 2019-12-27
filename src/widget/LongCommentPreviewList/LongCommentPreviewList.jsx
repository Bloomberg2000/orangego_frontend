import React from "react";
import './LongCommentPreviewList.css'
import {Button, Col, Divider, List, Pagination, Row, Typography} from "antd";
import * as PropTypes from "prop-types";
import LongCommentPreviewCard from "../LongCommentPreviewCard/LongCommentPreviewCard";
import Loading from "../Loading/Loading";

const {Title} = Typography;

export default class LongCommentPreviewList extends React.Component {
    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        withTitle: PropTypes.bool,
        withShowMoreButton: PropTypes.bool,
        getDataFunction: PropTypes.func,
        // 选填
        withAuthorPicShow: PropTypes.bool,
        withMoviePicShow: PropTypes.bool,
        withLikeOrDisLike: PropTypes.bool,
        title: PropTypes.string,
        data: PropTypes.array,
        page: PropTypes.number,
        total: PropTypes.number
    };

    static defaultProps = {
        isLastNode: false,
        isFirstNode: false,
        withShowMoreButton: false,
        withAuthorPicShow: false,
        withMoviePicShow: false,
        withLikeOrDisLike: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            total: this.props.total,
            data: this.props.data,
            currentPage: this.props.page,
            pageSize: 5,
        };
    }

    updateData() {
        let page = this.state.currentPage;
        let pageSize = this.state.pageSize;
        this.props.getDataFunction(page, pageSize);
    }

    // 监测屏幕变化
    componentDidMount() {
        this.updateData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            page: nextProps.page,
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
                                <Button type="link">
                                    查看更多 >
                                </Button>
                            </Col> : null}
                    </Row> : null}
                {this.state.data === null ?
                    <div style={{height: '100%'}}>
                        <Loading/>
                    </div> :
                    <div>
                        <List itemLayout="horizontal"
                              dataSource={this.state.data}
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
                        <Row type="flex" justify="end">
                            <Col>
                                <Pagination size="small"
                                            showQuickJumper
                                            showTotal={(total => {
                                                return `共 ${total} 条长评`
                                            })}
                                            defaultCurrent={1}
                                            pageSize={this.state.pageSize}
                                            total={this.state.total}
                                            onChange={(page, pageSize) => {
                                                this.setState({currentPage: page}, () => this.updateData())
                                            }}/>
                            </Col>
                        </Row>
                    </div>}
                {!isLastNode ? <Divider/> : <div style={{margin: '20px'}}/>}
            </div>
        );
    }
}
