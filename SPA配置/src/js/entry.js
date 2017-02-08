require("../css/common.scss");
import React from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link } from 'react-router';

import About from './about';
import App from './app';
import Inbox from './inbox';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox} />
        </Route>
    </Router>, document.getElementById('app'))