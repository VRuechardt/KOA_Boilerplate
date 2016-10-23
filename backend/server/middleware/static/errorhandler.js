"use strict";

module.exports = function *(next){
    try {
        yield next;
    } catch (ex){
        switch(ex.message){
            case 'Validation error':
            case 'Invalid Parameters':
                this.status = 400;
                break;
            default:
                throw ex;
        }
    }
};