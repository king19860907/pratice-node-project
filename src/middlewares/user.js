/**
 * Created by jun_ma on 2016/3/30.
 */

module.exports = function(done){

    $.checkLogin = function(req,res,next){
        if(!(req.session.user && req.session.user._id)){
            return next(new Error('please login firstly'));
        }
        next();
    };

    $.checkTopicAuthor = async function(req,res,next){

        const topic = await $.method('topic.get').call({_id:req.params.topic_id})
        if(!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

        if(topic.authorId.toString() !== req.session.user._id.toString()){
            return next(new Error('access denied'));
        }

        req.topic = topic;

        next();
    };

    done();
}