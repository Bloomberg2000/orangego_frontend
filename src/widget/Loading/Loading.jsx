import React from "react";
import './Loading.css'
import {Col, Row, Spin} from "antd";


export default class Loading extends React.Component {

    render() {
        // const loadingIcon = <Icon type="loading" style={{fontSize: 24}} spin/>
        return (
            <div className={"loading"} style={{height: '100%', width: '100%'}}>
                <Row type="flex" justify="space-around" align="middle" style={{height: '100%'}}>
                    <Col span={4}>
                        <Spin size={'large'} tip="正在加载..."/>
                    </Col>
                </Row>
            </div>
        )
    }
}
