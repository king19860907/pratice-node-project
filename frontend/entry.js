/**
 * Created by jun_ma on 2016/4/15.
 */
window.jQuery = require('jquery');
require("bootstrap-webpack");
import React from 'react';
import ReactDOM from 'react-dom';

console.log('hello world');

class App extends React.Component{

    render(){
        return (
            <div>
                <h1>Hello</h1>
            </div>
        );
    }
}

ReactDOM.render(<App/>,document.body);