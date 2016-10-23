"use strict";


const passport = require('koa-passport'),
      models = require('../../models'),
      LocalStrategy = require('passport-local').Strategy,
      assertionUtil = require('../../utils/assertions');

//unfortunately passport does not support generator functions so we are back to promises

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    return models.User.findAll({
        where: {id: id}
    }).then(function(retrievedUser) {

        if(retrievedUser.length === 1) {
            done(null, retrievedUser[0]);
        } else {

            var error = new Error("User with ID " + id + " does not exist");
            return done(error);
        }
    }).catch(function(error) {
        return done(error);
    }).done();
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done){
    return models.User.findAll({
        where: {
            email: email
        }
    }).then(function(users){
        if(users.length === 0){
            return done(new Error(`User with email ${email} does not exist`));
        } else if(users[0].password !== password){
            return done(new Error(`Wrong Password for user with email ${email}`));
        } else {
            return done(null, users[0]);
        }
    });
}));

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, function (req, email, password, done) {
    let body = req.body;
    assertionUtil.isNotEmpty([body.firstname, body.lastname]);
    return models.User.create({
        email: email,
        password: password,
        lastname: body.lastname,
        firstname: body.firstname
    }).then(function(user){
        return done(null, user);
    }).catch(function(err){
        return done(err, false);
    });
}));