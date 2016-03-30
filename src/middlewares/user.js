/**
 * Created by jun_ma on 2016/3/30.
 */

module.exports = function(done){

    $.checkLogin = function(req,res,next){
        if(!(req.session.user && req.session.user._id)){
            return next(new Error('please login firstly'));
        }
        next();
    }

    done();
}