var express = require('express');
var router = express.Router();
var User = require('./../models/user');

module.exports = function (passport) {

    // GLOBAL  
    router.get('/success', function (req, res) {
        return res.redirect('/#/profile');
    });

    router.get('/failure', function (req, res) {
        return res.redirect('/#/login');
    });

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRediret: '/auth/failure'
    }));

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRediret: '/auth/failure'
    }));

    router.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });

    return router;
};