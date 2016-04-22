/**
 * Created by jun_ma on 2016/4/15.
 */

import React from 'react';
import {getTopicDetail} from '../lib/client';
import {loginUser} from '../lib/client';
import {renderMarkdown} from '../lib/utils';
import 'highlight.js/styles/darkula.css';
import {Link} from 'react-router'

export default class  TopicDetail extends React.Component{

    constructor(props){
        super(props);
        this.state={};
    }

    componentDidMount(){
        getTopicDetail(this.props.params.id)
            .then(
                topic => {
                    topic.html = renderMarkdown(topic.content);
                    this.setState({topic});
                }
            )
            .catch(err => console.error(err));

        loginUser()
            .then(user => this.setState({user}))
            .catch(err => console.error(err));
    }

    render(){
        const topic = this.state.topic;
        const user = this.state.user;
        if(!topic){
            return (
                <div>正在加载....</div>
            );
        }
        return(
            <div>
                <h2>
                    {topic.title}
                    {
                        user && user._id === topic.authorId ?(
                            <Link to={`/topic/${topic._id}/edit`}>
                                <span className="glyphicon glyphicon-edit" style={{float:'right',color:'black'}} aria-hidden="true"/>
                            </Link>
                        ) : (<div/>)
                    }
                </h2>
                <section dangerouslySetInnerHTML={{__html: topic.html}}></section>
                <ul className="list-group">
                    {
                        topic.comments.map((item,i)=>{
                           return (
                               <li className="list-group-item" key={i}>
                                   {item.authorId}于{item.createAt}说：<br/>{item.content}
                               </li>
                           )
                        })
                    }
                </ul>
            </div>
        )
    }
}