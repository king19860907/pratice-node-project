/**
 * Created by jun_ma on 2016/3/15.
 */

import mongoose from 'mongoose';

module.exports=function(done){
    const conn = mongoose.createConnection($.config.get('db.mongodb'));
    $.mongodb = conn;
    $.model={};
    done();
}