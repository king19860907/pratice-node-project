/**
 * Created by jun_ma on 2016/4/15.
 */

import browserRequest from 'browser-request';

const urlBase = '/api/';

export function request(method,path,data={}){

    return new Promise((resolve,reject)=>{
        method = method.toUpperCase();
        const options = {
            method,
            url:`${urlBase}/${path}`,
        };
        if(method === 'GET' || method === 'HEAD'){
            options.qs = data;
        }else{
            options.form = data;
        }
        browserRequest(options,(err,res,body) =>{
            if(err){
                reject(err);
            }else{
                let data;
                try{
                    data = JSON.parse(body.toString());
                }catch(err){
                    return reject(new Error('parse JSON data error:'+err.message));
                }
                if(data.error){
                    reject(data.error);
                }else{
                    resolve(data.result);
                }
            }
        });
    });
}

export function getTopicList(options){
    return request('get','topic/list',{});z
}

export function getTopicDetail(id){
    return request('get',`topic/item/${id}`).then(ret=>ret.topic);
}

export function login(name,password){
    return request('post','login',{name,password});
}

export function loginUser(){
    return request('get','login_user').then(ret=>ret.user);
}

export function logout(){
    return request('post','logout');
}

export function addTopic(title,content,tags){
    return request('post','topic/add',{title,content,tags}).then(ret => ret.topic);
}

export function updateTopic(id, title, content, tags){
    return request('post',`topic/item/${id}`,{title,content,tags}).then(ret => ret.topic);
}