import React from "react";
import './MoviesList.css'
import {Col, List, Row, Tag, Typography} from "antd";
import MoviePreviewCard from "../MoviePreviewCard/MoviePreviewCard";
import * as PropTypes from "prop-types";

const {CheckableTag} = Tag;

const {Title} = Typography;

export default class MoviesList extends React.Component {
    static propTypes = {
        withTitle: PropTypes.bool,
        withFilter: PropTypes.bool,
        title: PropTypes.string,
        data: PropTypes.array,
        filterList: PropTypes.array
    };

    static defaultProps = {
        withTitle: false,
        withFilter: false
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
        if (this.state.windowWidth >= 1200) {
            // xxl 及以上
            return 8;
        } else if (this.state.windowWidth >= 992) {
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
        console.log((page - 1) * pageSize + " " + page * pageSize);
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
        const {withTitle, withFilter, filterList, title} = this.props;
        return (
            <div id="TheatricalPage"
                 style={{
                     background: '#fff', padding: '20px 20px 1px 20px'
                 }}>
                {withTitle ?
                    <Row type="flex" justify="space-between" align="middle">
                        <Col>
                            <Title level={4}>{title}</Title>
                        </Col>
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
                <List grid={{
                    gutter: 16, xs: 2, sm: 3, md: 4, lg: 6, xl: 6, xxl: 8,
                }}
                      dataSource={this.state.dataArray}
                      renderItem={item => (
                          <List.Item key={item.key} style={{padding: '5px'}}>
                              <MoviePreviewCard name={item.name} score={item.score}
                                                imgSrc={item.imgSrc}/>
                          </List.Item>
                      )}
                />
            </div>
        );
    }
}
