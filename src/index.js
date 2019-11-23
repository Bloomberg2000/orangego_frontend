import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import zhCN from 'antd/es/locale/zh_CN';
import * as serviceWorker from './serviceWorker';
import {AppWithRouter} from "./App";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {routes} from "./router";
import {ConfigProvider} from "antd";

ReactDOM.render(
    <Router>
        <ConfigProvider locale={zhCN}>
            <AppWithRouter>
                <Switch>
                    <Redirect exact from="/" to="/home"/>
                    {routes.map((router) => {
                        return <Route exact key={router.path} path={router.path} component={router.component}/>
                    })}
                </Switch>
            </AppWithRouter>
        </ConfigProvider>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
