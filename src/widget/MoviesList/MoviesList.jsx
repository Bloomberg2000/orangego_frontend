import React from "react";
import './MoviesList.css'
import {Col, List, Pagination, Row, Typography} from "antd";
import MoviePreviewCard from "../MoviePreviewCard/MoviePreviewCard";
import * as PropTypes from "prop-types";
import Loading from "../Loading/Loading";

const {Title} = Typography;

export default class MoviesList extends React.Component {
    static propTypes = {
        withTitle: PropTypes.bool,
        title: PropTypes.string,
        data: PropTypes.array,
        page: PropTypes.number,
        total: PropTypes.number,
        getDataFunction: PropTypes.func,
        lineNum: PropTypes.number,
    };

    static defaultProps = {
        withTitle: false,
        lineNum: 2
    };

    constructor(props) {
        super(props);
        this.state = {
            total: this.props.total,
            data: this.props.data,
            currentPage: this.props.page,
            selectedTags: this.props.selectedTags,
            pageSize: 0,
        };
    }

    setPageNum(num) {
        this.setState({
            currentPage: num
        }, this.updateData)
    }

    updateData() {
        let page = this.state.currentPage;
        let pageSize = this.state.pageSize;
        this.props.getDataFunction(page, pageSize);
    }

    // 监测屏幕变化
    componentDidMount() {
        this.setState({pageSize: this.getPageSize()}, () => this.updateData());
        window.addEventListener('resize', this.onWindowResize);
        this.props.onRef('movieList', this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            page: nextProps.page,
            data: nextProps.data,
            total: nextProps.total
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    getPageSize = () => {
        if (window.innerWidth >= 1600) {
            // xxl 及以上
            return 8 * this.props.lineNum;
        } else if (window.innerWidth >= 992) {
            // lg 及以上
            return 6 * this.props.lineNum;
        } else if (window.innerWidth >= 768) {
            // md 及以上
            return 4 * this.props.lineNum;
        } else if (window.innerWidth >= 576) {
            // sm 及以上
            return 3 * this.props.lineNum;
        } else {
            // xs
            return 2 * this.props.lineNum;
        }
    };

    onWindowResize = () => {
        this.setState({
            pageSize: this.getPageSize()
        })
    };

    render() {
        const {withTitle, title} = this.props;
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
                {this.state.data === null ?
                    <div style={{height: '100%'}}>
                        <Loading/>
                    </div> :
                    <List grid={{
                        gutter: 16, xs: 2, sm: 3, md: 4, lg: 6, xl: 6, xxl: 8,
                    }}
                          dataSource={this.state.data}
                          renderItem={item => (
                              <List.Item key={item.key} style={{padding: '5px'}}>
                                  <MoviePreviewCard id={item.id} name={item.name} score={item.score}
                                                    imgSrc={item.imgSrc}/>
                              </List.Item>
                          )}
                    />}
                <Row type="flex" justify="end">
                    <Col>
                        <Pagination size="small"
                                    showQuickJumper
                                    showTotal={(total => {
                                        return `共 ${total} 部电影`
                                    })}
                                    defaultCurrent={1}
                                    pageSize={this.state.pageSize}
                                    total={this.state.total}
                                    onChange={(page, pageSize) => {
                                        this.setState({currentPage: page}, () => this.updateData())
                                    }}/>
                    </Col>
                </Row>
                <div style={{margin: '20px'}}/>
            </div>
        );
    }
}
