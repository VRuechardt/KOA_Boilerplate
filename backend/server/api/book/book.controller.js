"use strict";
const models = require('../../models');
const assertionUtil = require('../../utils/assertions'),
      serialisationUtil = require('../../utils/serialisation');


exports.addBook = function *(){
    let body = this.request.body;
    assertionUtil.isNotEmpty([body.title, body.author]);
    this.status = 201;
    this.body = yield models.Book.create({
        title: body.title,
        author: body.author
    });
};

exports.getBooks = function *(){
    this.body = serialisationUtil.array_to_dict( yield models.Book.findAll());
};