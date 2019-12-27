import React from "react";
import './Error.css'
import {Button, Result} from "antd";
import * as PropTypes from "prop-types";
import {Route} from "react-router";


export default class Error extends React.Component {
    static propTypes = {
        content: PropTypes.string,
    };

    render() {
        return (
            <div className={"loading"} style={{height: '100%', width: '100%'}}>
                <Result
                    status="404"
                    title="404"
                    subTitle={this.props.content}
                    extra={
                        <Route render={({match, history}) => {
                            return (
                                <Button type="primary" onClick={()=>{
                                    history.push('/')
                                }}>
                                    返回主页
                                </Button>
                            )
                        }} />
                    }
                />
            </div>
        )
    }
}
