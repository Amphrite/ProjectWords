'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var taskSchema = mongoose.Schema({
    tags: [
         
    ],
   
    wordDesc    : {type: String, default: ""},
    taskName    : {type: String, default: ""}
});

module.exports = mongoose.model('Task', taskSchema);