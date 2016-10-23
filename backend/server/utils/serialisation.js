"use strict";

exports.array_to_dict = function(array){
    if(Array.isArray(array) && array.length !== 0){
        return array.map(elem => elem.to_dict());
    } else return []
};