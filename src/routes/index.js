/**
 * Created by jun_ma on 2016/3/16.
 */

module.exports = function(done){

    $.router.get('/',function(req,res,next){
        res.send(`现在是北京时间${new Date()}`);
        done();
    });
}
