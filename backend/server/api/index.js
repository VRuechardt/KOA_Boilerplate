"use strict";

let Router = require('koa-router');

let router = Router({
    prefix: '/api'
});

router.use(require('./auth'));
router.use(require('./book'));

module.exports = router.routes();