/**
 * Created by jun_ma on 2016/3/30.
 */

module.exports = function(done){

    $.router.post('/api/topic/add',$.checkLogin,async function (req,res,next){
        req.body.authorId = req.session.user._id;

        if('tags' in req.body){
            req.body.tags = req.body.tags.split(',').map(v=>v.trim()).filter(v => v);
        }

        const topic = await $.method('topic.add').call(req.body);

        res.apiSuccess({topic:topic });

    });

    $.router.get('/api/topic/list',async function(req,res,next){
        if('tags' in req.query){
            req.query.tags = req.query.tags.split(',').map(v => v.trim()).filter(v=>v);
        }
        const list = await $.method('topic.list').call(req.query);
        res.apiSuccess({list});
    });

    $.router.get('/api/topic/item/:topic_id',async function (req,res,next){
        const topic = await $.method('topic.get').call({_id:req.params.topic_id});
        for(const comment of topic.comments){
            const  user = await $.method('user.get').call({_id:comment.authorId.toString()});
            comment.nickname = user.nickname;
        }
        if(!topic){
            return next(new Error(`topic ${req.params.topic_id} does not exists`));
        }

        res.apiSuccess({topic:topic});
    });

    $.router.post('/api/topic/item/:topic_id',$.checkLogin,$.checkTopicAuthor,async function (req,res,next){
        req.body._id = req.params.topic_id;
        if('tags' in req.body){
            req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v=>v);
        }
        await $.method('topic.update').call(req.body);
        const topic = await $.method('topic.get').call({_id:req.params.topic_id});
        res.apiSuccess({topic:topic});
    });

    $.router.delete('/api/topic/item/:topic_id',$.checkLogin,$.checkTopicAuthor,async function (req,res,next){
        const topic = await $.method('topic.delete').call({_id:req.params.topic_id});
        res.apiSuccess({topic});
    });

    $.router.post('/api/topic/item/:topic_id/comment/add',$.checkLogin,async function(req,res,next){
        req.body._id = req.params.topic_id;
        req.body.authorId = req.session.user._id;
        const comment = await $.method('topic.comment.add').call(req.body);
        res.apiSuccess({comment:comment});
    });

    $.router.post('/api/topic/item/:topic_id/comment/delete',$.checkLogin,async function(req,res,next){
        req.body._id = req.params.topic_id;
        req.body.authorId = req.session.user._id;

        var topic = await $.method('topic.get').call({_id:req.body._id});
        if(!topic){
            return next(new Error('topic dose not exist'));
        }
        const comment = topic.comments.id(req.body.cid);
        if(!comment){
            return next(new Error('comment dose not exist'));
        }
        if(comment.authorId.toString() !== req.body.authorId.toString() && topic.authorId.toString() !== req.body.authorId.toString()){
            return next(new Error('access denied'));
        }
        topic = await $.method('topic.comment.delete').call(req.body);
        res.apiSuccess({topic:topic});
    });

    done();
}