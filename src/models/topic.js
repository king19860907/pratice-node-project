/**
 * Created by jun_ma on 2016/3/15.
 */

import mongoose from 'mongoose';

module.exports=function(done){

    const  Schema = mongoose.Schema;
    const  ObjectId = Schema.ObjectId;

    const comment = new Schema({
        authorId:ObjectId,
        content:String,
        createAt:Date,
        nickname:{type:String,trim:true},
    });

    const Topic = new Schema({
        authorId:{type:ObjectId,index:true},
        title:{type:String,trim:true},
        content:String,
        tags:[{type:String,index:true}],
        createAt:{type:Date,index:true},
        updateAt:{type:Date,index:true},
        comments:[comment],
    });

    $.mongodb.model('Topic',Topic);
    $.model.Topic = $.mongodb.model('Topic');

    done();
}