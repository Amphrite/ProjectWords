var express = require('express');
var router = express.Router();
var User = require('./../models/user');

module.exports = function (passport) {

    // GLOBAL  
    router.get('/success', function (req, res) {
        return  res.redirect('/#/frontpage');
        
    });

    router.get('/failure', function (req, res) {
        return res.send({ state: 'failure', user: null, message: 'Invalid username or password' });
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

     /* GOOGLE */
    router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // the callback after google has authenticated the user
    router.get('/google/callback',
        passport.authenticate('google', {
        successRedirect: '/#/frontpage',
        failureRedirect: '/'
        })
    );

    return router;
};