'use strict';

var assertNotEmpty = function(res){
    if(res === undefined || res === ""){
        throw new Error('Invalid Parameters');
    }
};

exports.isNotEmpty = function(res){
    if(Array.isArray(res)){
        res.map(elem => assertNotEmpty(elem));
    } else {
        assertNotEmpty(res);
    }
};