import React from "react";
import './DiscussesList.css'
import {Col, Divider, Row, Table, Typography} from "antd";
import * as PropTypes from "prop-types";

const {Title} = Typography;
const columns = [
    {
        title: '讨论',
        dataIndex: 'discussName',
        render: text => <a>{text}</a>,
    },
    {
        title: '作者',
        dataIndex: 'authorName',
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        align: 'right',
        width: '180px'
    }
];

export default class DiscussesList extends React.Component {
    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        withTitle: PropTypes.bool,
        title: PropTypes.string,

        getDataFunction: PropTypes.func,
        data: PropTypes.array,
        page: PropTypes.number,
        total: PropTypes.number
    };

    static defaultProps = {
        isLastNode: false,
        isFirstNode: false,
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
        const {isFirstNode, isLastNode, withTitle, title, data} = this.props;
        return (
            <div id="discussesList"
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
                <Table showHeader={false}
                       columns={columns}
                       dataSource={data}
                       pagination={{
                           size: 'small',
                           showQuickJumper: true,
                           showTotal: (totals) => `共 ${totals} 个讨论`,
                           defaultCurrent: 1,
                           pageSize: this.state.pageSize,
                           total: this.state.total,
                           onChange: (page, pageSize) => {
                               this.setState({currentPage: page}, () => this.updateData())
                           }
                       }}/>
                {!isLastNode ? <Divider/> : <div style={{margin: '20px'}}/>}
            </div>
        );
    }
}
