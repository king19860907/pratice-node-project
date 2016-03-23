'use strict'
/**
 * Created by majun on 16/3/23.
 */

module.exports = function(done){

    $.router.get('/api/login_user',async function(req,res,next){
        res.json({user:req.session.user,token:req.session.logout_token});
    });

    $.router.post('/api/login',async function(req,res,next){
        const user = await $.method('user.get').call(req.body);
        if(!user) return next(new Error('user does not exists'));

        if(!$.utils.validatePassword(req.body.password,user.password)){
            return next(new Error('incorrect password'));
        }
        req.session.user = user;
        req.session.logout_token = $.utils.randomString(20);
        res.json({user:req.session.user,token:req.session.logout_token});
    });

    $.router.post('/api/logout',async function(req,res,next){
        if(req.session.logout_token && req.session.logout_token != req.query.token){
            return next(new Error('invalid token'));
        }
        req.session.destroy();
        res.send('success');
    });

    $.router.post('/api/signup',async function(req,res,next){
        const user = await $.method('user.add').call(req.body);
        res.json({user:user});
    });

    done();
};