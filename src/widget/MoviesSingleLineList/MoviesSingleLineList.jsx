import React from "react";
import './MoviesSingleLineList.css'
import {Button, Col, Divider, List, Pagination, Row, Tag, Typography} from "antd";
import MoviePreviewCard from "../MoviePreviewCard/MoviePreviewCard";
import * as PropTypes from "prop-types";
import {Route} from "react-router";
import Loading from "../Loading/Loading";

const {CheckableTag} = Tag;

const {Title} = Typography;

export default class MoviesSingleLineList extends React.Component {
    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        withTitle: PropTypes.bool,
        withFilter: PropTypes.bool,
        withShowMoreButton: PropTypes.bool,
        withPagination: PropTypes.bool,
        ShowMoreHref: PropTypes.string,
        title: PropTypes.string,
        data: PropTypes.array,
        filterList: PropTypes.array,
        total: PropTypes.number,
        lineNum: PropTypes.number
    };

    static defaultProps = {
        isLastNode: false,
        isFirstNode: false,
        withFilter: false,
        lineNum: 1,
        withPagination: true,
        withShowMoreButton: false
    };

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            data: this.props.data,
            total: this.props.total,
            currentPage: 1,
            dataArray: [],
            selectedTags: [],
        };
    }

    getPageSize = () => {
        if (this.state.windowWidth >= 1600) {
            // xxl 及以上
            return 8 * this.props.lineNum;
        } else if (this.state.windowWidth >= 992) {
            // lg 及以上
            return 6 * this.props.lineNum;
        } else if (this.state.windowWidth >= 768) {
            // md 及以上
            return 4 * this.props.lineNum;
        } else if (this.state.windowWidth >= 576) {
            // sm 及以上
            return 3 * this.props.lineNum;
        } else {
            // xs
            return 2 * this.props.lineNum;
        }
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

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    render() {
        const {isFirstNode, isLastNode, withTitle, withFilter, withShowMoreButton, filterList, title} = this.props;
        return (
            <div id="TheatricalPage"
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
                {withFilter ?
                    filterList.map(item => (
                        <CheckableTag
                            key={item.key}
                            checked={this.state.selectedTags.indexOf(item) > -1}
                            onChange={(checked) => {
                                checked ?
                                    this.setState({selectedTags: [item]}) :
                                    this.setState({selectedTags: []})
                            }}
                        >
                            {item.value}
                        </CheckableTag>
                    )) : null}
                {this.state.data === null ?
                    <div style={{height: '100%'}}>
                        <Loading/>
                    </div> :
                    <List grid={{
                        gutter: 16, xs: 2, sm: 3, md: 4, lg: 6, xl: 6, xxl: 8,
                    }}
                          dataSource={this.state.dataArray}
                          renderItem={item => (
                              <List.Item key={item.key} style={{padding: '5px'}}>
                                  <MoviePreviewCard id={item.id} name={item.name} score={item.score}
                                                    imgSrc={item.imgSrc}/>
                              </List.Item>
                          )}
                    />}
                {this.props.withPagination ?
                    <Row type="flex" justify="end">
                        <Col>
                            <Pagination simple
                                        defaultCurrent={1}
                                        current={1}
                                        pageSize={this.state.pageSize}
                                        total={this.state.total}
                                        onChange={(page, pageSize) => {
                                            this.setState({currentPage: page}, () => this.getData())
                                        }}/>
                        </Col>
                    </Row> : null}
                {!isLastNode ? <Divider/> : <div style={{margin: '20px'}}/>}
            </div>
        );
    }
}
