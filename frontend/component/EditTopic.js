/**
 * Created by jun_ma on 2016/4/15.
 */

import React from 'react';
import jQuery from 'jquery';
import {redirectUrl} from '../lib/utils';
import {getTopicDetail} from '../lib/client';
import {updateTopic} from '../lib/client';

export default class  EditTopic extends React.Component{

    constructor(props){
        super(props);
        this.state={};
    }

    handleChange(name, e){
        this.state[name] = e.target.value;
    }

    componentDidMount(){
        this.state.id=this.props.params.id;
        getTopicDetail(this.props.params.id)
            .then(
                topic => {
                    this.setState({topic});
                }
            )
            .catch(err => console.error(err));
    }

    handleSubmit(e){
        const $btn = jQuery(e.target);
        $btn.button('loading');
        updateTopic(this.state.id,this.state.title,this.state.content,this.state.tags)
            .then(ret => {
                $btn.button('reset');
                redirectUrl(`/topic/${ret._id}`);
            })
            .catch(err => {
                alert(err);
                $btn.button('reset');
            })
    }

    render(){
        const topic = this.state.topic;
        if(!topic){
            return (
                <div>正在加载....</div>
            );
        }
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">编辑主题</div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="ipt-title">标题</label>
                            <input type="text" defaultValue={topic.title} className="form-control" id="ipt-title" onChange={this.handleChange.bind(this, 'title')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ipt-tags">标签</label>
                            <input  defaultValue={topic.tags} type="text" className="form-control" id="ipt-tags" onChange={this.handleChange.bind(this, 'tags')} />
                            <p className="help-block">多个标签使用半角逗号分隔</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ipt-content">内容</label>
                            <textarea defaultValue={topic.content} className="form-control" id="ipt-content" rows="10" onChange={this.handleChange.bind(this, 'content')} placeholder="">
                            </textarea>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>保存</button>
                    </form>
                </div>
            </div>
        )
    }
}