'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var answerSchema = mongoose.Schema({
    answer        : {type: String, default: ""}
});

module.exports = mongoose.model('Answer', answerSchema);
