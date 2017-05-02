'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var taskSchema = mongoose.Schema({
    word        : {type: String, default: ""},
    wordDescription    : {type: String, default: ""}
});

module.exports = mongoose.model('Task', taskSchema);