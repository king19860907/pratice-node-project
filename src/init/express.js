'use strict'
/**
 * Created by jun_ma on 2016/3/16.
 */

import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'multiparty';
import path from 'path';
import multipart from 'connect-multiparty';
import session from 'express-session';

module.exports=function(done){
    const app = express();
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(multipart());
    app.use(session({
        secret: $.config.get('web.session.secret'),
        resave: false,
        saveUninitialized: true,
    }))

    const  router = express.Router();

    //统一异常处理
    const  routerWrap = {};
    ['get','head','post','put','del','delete'].forEach(method =>{
        routerWrap[method] = function(path, ...fnList){
            fnList = fnList.map(fn=>{
                return function (req,res,next){
                    const ret = fn(req,res,next);
                    if(ret && ret.catch) ret.catch(next);
                };
            });
            router[method](path,...fnList);
        };
    });
    $.router = routerWrap;

    app.use(function(req,res,next){
        res.apiSuccess = function(data){
            res.json({success:true,result:data});
        }
        next();
    });


    app.use(router);
    app.use('/static',serveStatic(path.resolve(__dirname,'../../static')));

    const  debug = $.createDebug('api error');
    //输出异常统一为json格式
    app.use('/api',function(err,req,res,next){
        debug('API error:%s',err && err.stack || err);
        res.json({error:err.toString()});
    });

    app.listen($.config.get('web.port'),(err)=>{
        done(err);
    });

    done();
}