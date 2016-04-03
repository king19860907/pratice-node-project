'use strict'
/**
 * Created by jun_ma on 2016/3/15.
 */

import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

//设置全局变量$
const $ = global.$ = new ProjectCore();

//创建debug函数
$.createDebug = function(name){
    return createDebug('my:'+name);
};
const debug = $.createDebug('server');

//加载配置文件
$.init.add((done)=>{
    //默认加载config.js配置文件
    $.config.load(path.resolve(__dirname,'config.js'));
    const env = process.env.NODE_ENV || null;
    //如果有设置环境变量，则同时也加载环境变量对应的配置文件
    if(env){
        debug('load env: %s',env);
        const envConfig = require('../config/'+env+'.js');
        if(typeof envConfig != 'function'){
            done(new Error(env+'.js is not export a function'));
        }
        $.config.load(path.resolve(__dirname,'../config',env+'.js'));
    }
    $.env = env;
    done();
});

//初始化mongodb
$.init.load(path.resolve(__dirname,'init','mongodb.js'));
$.init.load(path.resolve(__dirname,'models'));

//加载methods
$.init.load(path.resolve(__dirname,'methods'));

//初始化Express
$.init.load(path.resolve(__dirname,'init','express.js'));
//初始化中间件
$.init.load(path.resolve(__dirname,'middlewares'));
//加载路由
$.init.load(path.resolve(__dirname,'routes'));

//初始化
$.init((err)=>{
    if(err){
        console.error(err);
        process.exit(-1);
    }else{
        console.log('inited [env=%s]',$.env);
    }


   /* const user =  $.model.User({
        name:"majun2",
        password:"123456",
        nickname:'majun2',
    });
    user.save(console.log);*/

    //require('./test');
});