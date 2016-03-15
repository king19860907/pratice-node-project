/**
 * Created by jun_ma on 2016/3/15.
 */

/**
 * Created by jun_ma on 2016/3/15.
 */

import mongoose from 'mongoose';

module.exports=function(done){
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;

    const User = new Schema({
        name:{type:String,unique:true},
        password:String,
        nickname:String,
    });

    $.mongodb.model('User',User);
    $.model.User = $.mongodb.model('User');
    done();
}