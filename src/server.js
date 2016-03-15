'use strict'
/**
 * Created by jun_ma on 2016/3/15.
 */

import path from 'path';
import ProjectCore from 'project-core';

const $ = new ProjectCore();

//加载配置文件
$.init.add((done)=>{
    $.config.load(path.resolve(__dirname,'config.js'));
    const env = process.env.NODE_ENV || null;
    if(env){
        $.config.load(path.resolve(__dirname,'../config',env+'.js'));
    }
    $.env = env;
    done();
});

//初始化
$.init((err)=>{
    if(err){
        console.error(err);
        process.exit(-1);
    }else{
        console.log('inited');
    }
});