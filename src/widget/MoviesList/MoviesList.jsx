import React from "react";
import './MoviesList.css'
import {Col, Divider, List, Row, Typography} from "antd";
import MoviePreviewCard from "../MoviePreviewCard/MoviePreviewCard";
import * as PropTypes from "prop-types";

const {Title} = Typography;

export default class MoviesList extends React.Component {
    static propTypes = {
        isLastNode: PropTypes.bool,
        isFirstNode: PropTypes.bool,
        withTitle: PropTypes.bool,
        title: PropTypes.string,
        data: PropTypes.array
    };

    static defaultProps = {
        isLastNode: false,
        isFirstNode: false
    };

    render() {
        const {isFirstNode, isLastNode, withTitle, title, data} = this.props;
        return (

            <div id="TheatricalPage"
                 style={{
                     background: '#fff',
                     padding: (isFirstNode === true) ? '20px 20px 1px 20px' : '0px 20px 1px 20px'
                 }}>
                {withTitle ?
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={24}>
                            <Title level={4}>{title}</Title>
                        </Col>
                    </Row> : null}
                <List grid={{
                    gutter: 16, xs: 2, sm: 2, md: 3, lg: 4, xl: 6, xxl: 6,
                }}
                      dataSource={data}
                      renderItem={item => (
                          <List.Item style={{padding: '5px'}}>
                              <MoviePreviewCard name={item.name} score={item.score}
                                                imgSrc={item.imgSrc}/>
                          </List.Item>
                      )}
                />
                {!isLastNode ? <Divider/> : null}
            </div>
        );
    }
}
