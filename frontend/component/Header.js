/**
 * Created by jun_ma on 2016/4/15.
 */

import React from 'react';
import {Link} from 'react-router'
import {loginUser,logout} from '../lib/client';

export default class  Header extends React.Component{

    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){
        loginUser()
            .then(user => this.setState({user}))
            .catch(err => console.error(err));
    }

    handleLogout(){
        logout()
            .then(user => location.reload())
            .catch(err => console.error(err));
    }

    render(){
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">简单论坛系统</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active">
                                <Link to="/">首页</Link>
                            </li>
                            <li>
                                <Link to="/new">
                                    <i className="glyphicon glyphicon-plus"></i> 发帖
                                </Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {
                                this.state.user ? (
                                    <li><a onClick={this.handleLogout.bind(this)}>注销 [{this.state.user.nickname}]</a></li>
                                ) : (
                                    <ul className="nav navbar-nav navbar-right">
                                        <li><a href="/login">登录</a></li>
                                        <li><a href="/signup">注册</a></li>
                                    </ul>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}