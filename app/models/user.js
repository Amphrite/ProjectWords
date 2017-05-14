'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    email        : {type: String, default: ""},
    password     : {type: String, default: ""},
    role         : {type: String, default: ""},
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }   

});


userSchema.methods.generateHash = function (Password) {
    return bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);