/**
 * Created by jun_ma on 2016/3/15.
 */

import mongoose from 'mongoose';

module.exports=function(done){

    const  debug = $.createDebug('init:mongodb');
    debug('connection to mongodb');
    const conn = mongoose.createConnection($.config.get('db.mongodb'));
    $.mongodb = conn;
    $.model={};

    //$.utils.ObjectId = mongoose.Types.ObjectId; //获取ObjectId

    done();
}