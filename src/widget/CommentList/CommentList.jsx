import React from "react";
import './CommentList.css'
import {Button, Col, Divider, List, Pagination, Row, Typography} from "antd";
import * as PropTypes from "prop-types";
import CommentPreviewCard from "../CommentPreviewCard/CommentPreviewCard";

const {Title} = Typography;

export default class CommentList extends React.Component {
    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        withTitle: PropTypes.bool,
        withShowMoreButton: PropTypes.bool,
        title: PropTypes.string,
        data: PropTypes.array,
    };

    static defaultProps = {
        isLastNode: false,
        isFirstNode: false,
        withShowMoreButton: false
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
        if (this.state.windowWidth >= 992) {
            // lg 及以上
            return 6;
        } else if (this.state.windowWidth >= 768) {
            // md 及以上
            return 4;
        } else if (this.state.windowWidth >= 576) {
            // sm 及以上
            return 3;
        } else {
            // xs
            return 2;
        }
    };

    getData() {
        let page = this.state.currentPage;
        let pageSize = this.state.pageSize;
        console.log((page - 1) * pageSize + " " + page * pageSize)
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
                              <CommentPreviewCard name={item.name} score={item.score}
                                                  imgSrc={item.imgSrc}/>
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
