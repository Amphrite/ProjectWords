var express = require('express');
var router = express.Router();
var User = require('./../models/user');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to

    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not authenticated then redirect him to the login page

    res.json(403, "you're not authenticated");
};

module.exports = function () {
    // Every time there's a request, this will check if the user is logged in
    router.all('*', isAuthenticated, function (req, res, next) {
        next();
    });

    // Get all
    router.get('/users', function (req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.send(500, err);
            }
            return res.send(200, users);
        });
    });

    // Get by id
    router.get('/users/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
            console.log(req.params.id);
            if (err) {
                res.send(500, err);
            }
            res.json(200, user);
        });
    });

    router.get('/current', function (req, res) {
        User.findById(req.user.id, function (err, currentUser) {
            if (err) {
                res.send(500, err);
            }
            res.json(200, currentUser);
        });
    });

    // Update data
    router.put('/users/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
            console.log(req.params.id)
            if (err) {
                return res.send(err);
            }
            var email = req.body.email;

            user.save(function (err, user) {
                if (err) {
                    return res.send(err);
                }
                return res.json(user);
            });
        });
    });

    router.delete('/users/:id', function (req, res) {
        User.remove({
            _id: req.params.id
        }, function (err, user) {
            if (err) {
                return res.send(err);
            } else {
                res.json({ message: 'Successfully deleted' });
            }
        });
    });

    return router;
}