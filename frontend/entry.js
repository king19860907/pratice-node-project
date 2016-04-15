/**
 * Created by jun_ma on 2016/4/15.
 */
window.jQuery = require('jquery');
require("bootstrap-webpack");
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log('hello world');

ReactDOM.render(<App/>,document.body);