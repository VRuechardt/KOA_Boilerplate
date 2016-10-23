const path = require('path');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-generic-session');
const passport = require('koa-passport');
const sendfile = require('koa-sendfile');

module.exports = function(app){

    //add global error handler
    app.use(require('./errorhandler'));

    //all installed middleware that we use
    app.use(bodyParser());

    app.keys = ['secret'];
    app.use(session(app));

    //initialize passport
    require('./passport');
    app.use(passport.initialize());
    app.use(passport.session());

    //mount api
    app.use(require('../../api'));

    //serve static files
    app.use(serve(path.normalize(path.join(__dirname, '../../../../frontend/')),
                  {gzip: true}));

    //otherwise serve index file (important for angular HTML5 mode)
    app.use(function *(next){
        yield next;
        if (this.body || !this.idempotent) return;
        yield sendfile(this, path.normalize(path.join(__dirname, '../../../../frontend/index.html')));
        if (!this.status) this.throw(404)
    });
};