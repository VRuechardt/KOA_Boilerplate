"use strict";
const NODE_ENV = process.env.NODE_ENV || 'development';

if(NODE_ENV === 'production'){
    console.log('RUNNING IN PRODUCTION ON LIVE DATABASE');
}

let config = {
    server: require('./server.js'),
    mysql: require('./enviroment/' + NODE_ENV +'.js')
};

module.exports = config;