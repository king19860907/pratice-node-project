/**
 * Created by jun_ma on 2016/3/15.
 */

const defaultConfig = function(set,get,has){
    //监听端口
    set('web.port','3000');
    set('web.session.secret','majun');
    set('web.session.redis',{
        host:'10.1.6.19',
        port:6379,
    });
};

module.exports = defaultConfig;