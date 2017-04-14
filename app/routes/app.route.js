
var express = require('express');
var router = express.Router();

module.exports = function () {

    var isAuthenticated = function (req, res, next) {

        // if user is authenticated in the session, call the next() to call the next request handler
        // Passport adds this method to request object. A middleware is allowed to add properties to

        if (req.isAuthenticated()) {
            console.log("next")
            next();
        } else {
            // if the user is not authenticated then redirect him to the login page
            res.redirect('/');
        }
    };

    router.get('/', isAuthenticated, function(req, res){
        res.sendfile('./public/index.html');
    });

    // route for logging out
    router.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    });

    return router;
}