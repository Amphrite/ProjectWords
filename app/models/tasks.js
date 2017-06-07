'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var taskSchema = mongoose.Schema({
    tags: [{
        text: {type: String, default: ""},
        desc: {type: String, default: ""},
        id: {type: String, default: ""},

        answer: [
            { userId: String,
              answer: String
            }
        ]
    }],
    taskName    : {type: String, default: ""}


    
});

module.exports = mongoose.model('Task', taskSchema);