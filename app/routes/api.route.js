var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Answer = require('./../models/answers');
var Task = require('./../models/tasks');


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


       router.post('/task', function (req,res) {
        var task = req.body.tag;
        var taskDesc = req.body.wordDesc;
        var taskName = req.body.taskName;
        console.log(req.body);
        var newTask = new Task ({
            tags:[{word:task}],
            wordDesc: taskDesc,
            taskName: taskName 
        });


        newTask.save(function(err){
            if (err) {
                return res.send(err);
            }
            return res.json(newTask);
        });
    });

    router.get('/task', function (req, res) {
        Task.find( function (err, currentTask) {
            console.log("router.task");
            if (err) {
                res.send(500, err);
            }
            res.json(200, currentTask);
        });
    });

        // Get by id
    router.get('/task/:id', function (req, res) {
        console.log("Task Get ID");
        console.log(req.params.id);
        Task.findById(req.params.id, function (err, task) {
            console.log(req.params.id);
            if (err) {
                res.send(500, err);
            }
            res.json(200, task);
        });
    });


    return router;
}