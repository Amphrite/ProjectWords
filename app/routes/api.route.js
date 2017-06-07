var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var Task = require('./../models/tasks');

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

    /*router.post('/answer', function (req,res) {
        var answer = req.body.answers;
        console.log(req.body.answers);
        console.log("Answer Post")
        var newAnswer = new Task ({
            task.tags.answer: answer
        });

        /*newAnswer.save(function(err){
            if (err) {
                return res.send(err);
            }
            return res.json(newAnswer);
        });
    }); */

    router.put('/answer/:id', function (req, res) {
        var answer = { userId: req.body[0].userId, answer: req.body[0].answers};
        var update = {$push: {'tags.$.answer': answer }};
        var query = { '_id': req.params.id, 'tags._id': req.body[0].id  }
        Task.findOneAndUpdate(query, update, { projection: { 'tags.$': 1 } , returnNewDocument: true }, function( err, answer ){
            console.log(answer);
        });
    });







    router.post('/task', function (req, res) {
        var word = req.body.tag;
        var taskName = req.body.taskName;
        console.log(req.body);

        var newTask = new Task();
        newTask.taskName = taskName;
        for (var i = 0; i < word.length; i++) {

            newTask.tags.push(word[i]);
        }
        // POSTING AF FLERE ORD TIL SAMME TASK!





        newTask.save(function (err) {
            if (err) {
                return res.send(err);
            }
            return res.json(newTask);
        });
    });

    router.get('/task', function (req, res) {
        Task.find(function (err, currentTask) {
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
            console.log(task);
            if (err) {
                res.send(500, err);
            }
            res.json(200, task);
        });
    });

    router.get('/answer', function (req, res) {
        console.log("Task Get ID");
        console.log(req.params.id);
        Task.find(function (err, answer) {
            console.log(req.params.id);
            console.log(answer);
            if (err) {
                res.send(500, err);
            }
            res.json(200, answer);
        });
    });

    router.get('/tasktags/:id', function (req, res) {
        console.log("Task Get ID");
        console.log(req.params.id);
        Task.findById(req.params.id, function (err, task) {
            console.log(req.params.id);
            console.log(task.tags);
            if (err) {
                res.send(500, err);
            }
            res.json(200, task.tags);
        });
    });

    router.get('/answertags/:id', function (req, res) {
        console.log("Answer Get ID");
        console.log(req.params.id);
        Task.findById(req.params.id, function (err, answer) {
            console.log(req.params.id);
            if (err) {
                res.send(500, err);
            }
            res.json(200, answer.answer);
        });
    });




    return router;
}