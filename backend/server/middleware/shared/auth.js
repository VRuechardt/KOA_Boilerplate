'use strict';

exports.isAuthenticated = function *(next){
    if(this.req. isAuthenticated()){
        yield next;
    } else {
        this.res.statusCode = 401;
    }
};