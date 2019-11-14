import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import Home from "./pages/Home/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {routes} from "./router";

ReactDOM.render(
    <Router>
        <Home>
            <Switch>
                {routes.map((router) => {
                    return <Route key={router.path} path={router.path} component={router.component}/>
                })}
            </Switch>
        </Home>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
