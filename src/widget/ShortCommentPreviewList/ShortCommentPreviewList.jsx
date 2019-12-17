import React from "react";
import './ShortCommentPreviewList.css'
import {Button, Col, Divider, List, Pagination, Row, Typography} from "antd";
import * as PropTypes from "prop-types";
import ShortCommentPreviewCard from "../ShortCommentPreviewCard/ShortCommentPreviewCard";

const {Title} = Typography;

export default class ShortCommentPreviewList extends React.Component {
    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        withTitle: PropTypes.bool,
        withShowMoreButton: PropTypes.bool,
        // 选填
        withAuthorPicShow: PropTypes.bool,
        withLike: PropTypes.bool,
        title: PropTypes.string,
        data: PropTypes.array,
        pageSize: PropTypes.number
    };

    static defaultProps = {
        isLastNode: false,
        isFirstNode: false,
        withShowMoreButton: false,
        withAuthorPicShow: false,
        withLike: false,
    };

    constructor(props) {
        super(props);
        /**
         * 为数组添加Key
         */
        for (let i = 0; i < props.data.length; i++) {
            props.data[i]['key'] = i;
        }
        this.state = {
            windowWidth: window.innerWidth,
            total: this.props.data.length,
            pageSize: 0,
            currentPage: 1,
            dataArray: [],
            selectedTags: [],
        };
    }

    getPageSize = () => {
        return 3;
    };

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

    onWindowResize = () => {
        this.setState({
            windowWidth: window.innerWidth,
        });
    };

    // 监测屏幕变化
    componentDidMount() {
        this.setState({pageSize: this.getPageSize()}, () => this.getData());
        window.addEventListener('resize', this.onWindowResize);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let pageSize = this.getPageSize();
        if (prevState.pageSize !== pageSize) {
            this.setState({pageSize: this.getPageSize()}, () => this.getData());
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
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
                <List itemLayout="horizontal"
                      dataSource={this.state.dataArray}
                      renderItem={item => (
                          <List.Item key={item.key} style={{padding: '5px'}}>
                              <ShortCommentPreviewCard
                                  authorId={item.authorId}
                                  movieId={item.movieId}
                                  commentId={item.commentId}
                                  authorName={item.authorName}
                                  movieName={item.movieName}
                                  movieScore={item.movieScore}
                                  editTime={item.editTime}
                                  commentType={item.commentType}
                                  commentContent={item.commentContent}
                                  withAuthorPicShow={this.props.withAuthorPicShow}
                                  authorPic={item.authorPic}
                                  withLike={this.props.withLike}
                                  likeNumber={item.likeNumber}
                              />
                          </List.Item>
                      )}
                />
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
                </Row>
                {!isLastNode ? <Divider/> : <div style={{margin: '20px'}}/>}
            </div>
        );
    }
}
