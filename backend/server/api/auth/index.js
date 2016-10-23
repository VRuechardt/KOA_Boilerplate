"use strict";

const Router = require('koa-router');
const passport = require('koa-passport');
const authMiddleware = require('../../middleware/shared/auth');

var router = new Router({
    prefix: '/auth'
});


let controller = require('./auth.controller');

router.post('/login', passport.authenticate('local-login'), controller.returnOkAndUserJson);
router.post('/register', passport.authenticate('local-register'), controller.returnCreatedAndUserJson);

router.get('/check_login', authMiddleware.isAuthenticated, controller.returnOkAndUserJson);
router.get('/logout', authMiddleware.isAuthenticated, controller.logout);

module.exports = router.routes();