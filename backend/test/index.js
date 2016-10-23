"use strict";

const request = require('supertest-koa-agent');
const assert = require("should");
//set node_env to test so the app will use the test-db and provide a start function with callback
process.env.NODE_ENV = 'test';

describe('testing api', function(){
    before(function(done){
        //increase setup timeout (defaults to 2s which could not be enough to fully initialize the server)
        this.timeout(5000);
        require('../server/app').test(done);
    });

    require('./test_general');
    require('./test_auth');
});
