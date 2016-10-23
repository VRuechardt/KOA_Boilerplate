"use strict";

const Router = require('koa-router');
const passport = require('koa-passport');
const authMiddleware = require('../../middleware/shared/auth');

var router = new Router({
    prefix: '/book'
});


let controller = require('./book.controller');

router.post('/', controller.addBook);
router.get('/', controller.getBooks);

module.exports = router.routes();