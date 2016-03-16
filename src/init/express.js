'use strict'
/**
 * Created by jun_ma on 2016/3/16.
 */

import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'multiparty';
import path from 'path';

module.exports=function(done){
    const app = express();
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    app.use(bodyParser.json());

    const  router = express.Router();
    $.router = router;
    app.use(router);
    app.use('/static',serveStatic(path.resolve(__dirname,'../../static')));

    app.listen($.config.get('web.port'),(err)=>{
        done(err);
    });

    done();
}