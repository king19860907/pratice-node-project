'use strict'
/**
 * Created by jun_ma on 2016/3/22.
 */

import validator from 'validator';

module.exports = function(done){

    $.method('topic.add').check({
        authorId:{require:true,validate:(v)=>validator.isMongoId(v)},
        title:{require:true},
        content:{require:true},
        tags:{validate:(v)=>Array.isArray(v)},
    });
    $.method('topic.add').register(async function (params){
        const topic = new $.model.Topic(params);
        topic.createAt = new Date();
        return topic.save();
    });

    $.method('topic.get').check({
        _id:{require:true,validate:(v)=>validator.isMongoId(v)},
    });
    $.method('topic.get').register(async function (params){
        return $.model.Topic.findOne({_id:params._id});
    });

    $.method('topic.list').check({
        authorId:{validate:(v)=>validator.isMongoId(v)},
        tags:{validate:(v)=>Array.isArray(v)},
        skip:{validate:(v)=> v >= 0},
        limit:{validate:(v)=> v > 0},
    });
    $.method('topic.list').register(async function (params){
        const query = {};
        if(params.authorId) query.authorId = params.authorId;
        if(params.tags) query.tags = {$all:params.tags};
        const ret = $.model.Topic.find(query,{
            authorId:1,
            title:1,
            tags:1,
            createAt:1,
            updateAt:1,
            lastCommentedAt:1,
        });
        if(params.skip) ret.skip(params.skip)
        if(params.limit) ret.limit(params.limit);

        return ret;
    });

    done();
};