'use strict';

var request = require('supertest-koa-agent');
var server = require('../../server/app');

describe('testing auth endpoint', function(){
    describe('testing register', () => {
        this.timeout(10000);
        let agent = request(server);

        it('testing loginStatus pre-register', (done)=> {
            agent.get('/api/auth/check_login').expect(401).end(function(err, res){
                if(err) throw err;
                done();
            });
        });

        it('testing register', (done)=>{
            agent.post('/api/auth/register')
                .send({email: 'crispy@live.de', password: 'password', firstname: 'Christian', lastname: 'Brachert'}).expect(201)
                .end(function(err, res){
                    if(err) throw err;
                    done();
            });
        });

        it('testing loginStatus post-regiser', (done)=> {
            agent.get('/api/auth/check_login').expect(200).end(function(err, res){
                if(err) throw err;
                done();
            });
        });

        it('testing register with not unqiue email', (done)=>{
            agent.post('/api/auth/register')
                .send({email: 'crispy@live.de', password: 'password2', firstname: 'Christian2', lastname: 'Brachert2'}).expect(400)
                .end(function(err, res){
                    if(err) throw err;
                    done();
                });
        });
        it('testing register without all required fields', (done) => {
            agent.post('/api/auth/register')
                .send({email: 'crispy3@live.de', password: 'password3', lastname: 'Brachert3'}).expect(400)
                .end(function(err, res){
                    if(err) throw err;
                    done();
                });
        });
    });

    describe('testing login', function(){
        before(function(done){
            let agent = request(server);
            agent.post('/api/auth/register')
                .send({email: 'log@in.de', password: 'loginpassword', firstname: 'Christian',lastname: 'Brachert'})
                .expect(201).end(function(err, res){
                if (err) throw err;
                agent.get('/api/auth/logout').end(function(err, res){
                    if(err) throw err;
                    done();
                });
            });
        });

        it('logging in', (done) => {
            let agent = request(server);
            agent.post('/api/auth/login')
                .send({email: 'log@in.de', password: 'loginpassword'}).expect(200).end(function(err, res){
                    if (err) throw err;
                agent.get('/api/auth/check_login').expect(200).end(function(err, res){
                    if(!err) done();
                });
            });
        });

        it('testing logout functionality', function(done){
            let agent = request(server);
            agent.post('/api/auth/login')
                .send({email: 'log@in.de', password: 'loginpassword'}).expect(200).end(function(err, res){
                if (err) throw err;
                agent.get('/api/auth/logout').expect(200).end(function(err, res){
                    if(err) throw err;
                    agent.get('/api/auth/check_login').expect(401).end(function(err, res){
                        if(!err) done();
                    });
                });
            });
        });

        it('Login does not accept wrong password', function(done){
            let agent = request(server);
            agent.post('/api/auth/register')
                .send({email: 'log@in.de', password: 'wrongpassword'}).expect(400).end(function(err, res) {
                if(err)throw err;
                done();
            });
        });

        it('Logging on with an account that does not exist', function(done){
            let agent = request(server);
            agent.post('/api/auth/register')
                .send({email: 'random@email.de', password: 'loginpassword'}).expect(400).end(function(err, res) {
                if(err) throw err;
                done();
            });
        });
    });
});
