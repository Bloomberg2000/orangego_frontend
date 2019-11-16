import React from "react";
import './CommentsPage.css'
import {Typography} from "antd";

const {Title} = Typography;
export default class CommentsPage extends React.Component {
    render() {
        return (
            <div id="CommentsPage" style={{background: '#fff',padding:'20px'}}>
                <Title level={4}>最受欢迎的影评</Title>
            </div>
        );
    }
}
