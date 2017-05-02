var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Answer = require('./../models/answers');

module.exports = function () {

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
            user.email = req.body.email;

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

    // ** USER INPUT ** //
    // router post af user input til tasks

    router.post('/answer', function (req,res) {
        var answer =req.body.answers;
        console.log(req.body);
        var newAnswer = new Answer ({
            answer: answer
        });

        newAnswer.save(function(err){
            if (err) {
                return res.send(err);
            }
            return res.json(newAnswer);
        });
    });

    return router;
}