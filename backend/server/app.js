"use strict";

const koa = require('koa');
const co = require('co');
const http  = require('http');
const config = require('./config');
const models = require('./models');

let app = koa();

//wrapper co function so we can use yield during setup
app.setup = co.wrap(function* (){
    try{
        if (process.env.NODE_ENV === 'test') yield models.sequelize.sync({force: true});
        else yield models.sequelize.sync();

        //mount all middleware (including api and static-files)
        require('./middleware/static')(app);

        //create http server
        http.createServer(app.callback()).listen(config.server.httpPort);
        console.log(`server listening on port ${config.server.httpPort} in ${app.env} mode`);
    } catch(e) {
        console.log(e)
    }
});

//in test mode we need to pass a callback so mocha wont test until server is finished seting up
if(process.env.NODE_ENV === 'test') {
    app.test = function(done){
        app.setup().then(() => {done()})
    };
} else {
    app.setup()
}

module.exports = app;