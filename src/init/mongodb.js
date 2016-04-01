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

    const  Schema = mongoose.Schema;
    const  ObjectId = Schema.ObjectId;
    $.utils.ObjectId = ObjectId;

    done();
}