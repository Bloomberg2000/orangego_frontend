import React from "react";
import {Avatar, Badge, Button, Modal, Tabs, Typography} from "antd";
import Login from "../Login/Login";


const {Title} = Typography;
const {TabPane} = Tabs;

export default class LogInOrSignInModal extends React.Component {
    state = {
        loading: false,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 3000);
    };

    handleCancel = () => {
        this.setState({visible: false});
    };

    callback(key) {
        console.log(key);
    }

    render() {
        const {visible, loading} = this.state;
        return (
            <div>
                <Badge count={"登录"}>
                    <Avatar style={{margin: "0 0 0.75em 0.6em"}} size={32} icon="user"
                            onClick={this.showModal}/>
                </Badge>
                <Modal
                    visible={visible}
                    // title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            返回
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            提交
                        </Button>,
                    ]}
                >
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="登录" key="1">
                            <Login></Login>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        );
    }
}
