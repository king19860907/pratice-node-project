import React from 'react';
import {Link} from 'react-router';
import {login} from '../lib/client';
import jQuery from 'jquery';
import {redirectUrl} from '../lib/utils';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    handleChange(name, e){
        this.state[name] = e.target.value;
    }

    handleLogin(e){
        const $btn = jQuery(e.target);
        $btn.button('loading');
        login(this.state.name,this.state.password)
            .then(ret => {
                $btn.button('reset');
                redirectUrl('/');
            })
            .catch(err => {
                alert(err);
                $btn.button('reset');
            });
    }

    render(){
        return(
            <div style={{width:300,margin:'auto'}}>
                <div className="panel panel-primary">
                    <div className="panel-heading">登录</div>
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <label for="ipt-name">用户名</label>
                                <input type="username" className="form-control" id="ipt-name" onChange={this.handleChange.bind(this,'name')} placeholder="用户名"/>
                            </div>
                            <div className="form-group">
                                <label for="password">密码</label>
                                <input type="password" className="form-control" id="password" onChange={this.handleChange.bind(this,'password')} placeholder="密码"/>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.handleLogin.bind(this)}>登录</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}