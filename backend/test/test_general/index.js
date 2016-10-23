"use strict";
const assert = require("should");
const request = require('supertest-koa-agent');
const server = require('../../server/app');

describe('testing general stuff', function(){
    it('test static content', function(done){
        request(server).get('/api/auth/asdf').expect(200).end(function(err, res){
            if(err) throw err;
            done();
        });
    });

    //TODO: test if gzipping propperly
});