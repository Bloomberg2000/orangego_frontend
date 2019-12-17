import React from "react";
import './DiscussesList.css'
import {Col, Divider, Row, Table, Tag, Typography} from "antd";
import * as PropTypes from "prop-types";

const {CheckableTag} = Tag;

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
        render: text => <span>来自 <a>{text}</a></span>,

    },
    {
        title: '回应',
        dataIndex: 'replyNum',
        render: text => <span>{text} 回应</span>,
        align:'right',
        width:'90px'
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        align:'right',
        width:'180px'
    }
];

export default class DiscussesList extends React.Component {
    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        withTitle: PropTypes.bool,
        title: PropTypes.string,
        data: PropTypes.array,
    };

    static defaultProps = {
        isLastNode: false,
        isFirstNode: false,
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
        };
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
                           showQuickJumper: true,
                           showSizeChanger: true,
                           // showTotal: () => `共${totals}条`
                       }}/>
                {!isLastNode ? <Divider/> : <div style={{margin: '20px'}}/>}
            </div>
        );
    }
}
