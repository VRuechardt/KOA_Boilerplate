"use strict";
const models = require('../../models');

exports.returnCreatedAndUserJson = function* (){
    this.body = this.req.user.to_dict();
    this.status = 201;
};

exports.returnOkAndUserJson = function *(){
    this.body = this.req.user.to_dict();
};

exports.logout = function*(){
   this.req.logout();
    this.status = 200;
};