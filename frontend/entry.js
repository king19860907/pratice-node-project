/**
 * Created by jun_ma on 2016/4/15.
 */
window.jQuery = require('jquery');
require("bootstrap-webpack");
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link,browserHistory} from 'react-router'
import App from './App';
import TopicDetail from './component/TopicDetail';
import Login from './component/Login';
import NewTopic from './component/NewTopic';
import EditTopic from './component/EditTopic';

const e = document.createElement('div');
e.id = 'app';
document.body.appendChild(e);

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/topic/:id" component={TopicDetail}/>
            <Route path="new" component={NewTopic}/>
            <Route path="/login" component={Login}/>
            <Route path="/topic/:id/edit" component={EditTopic}/>
        </Route>
    </Router>
),e);