// Base Setup for the server - NODE.JS plugins
var express = require('express');
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var passport = require('passport');
var passportLocal = require('passport-local');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var session = require('express-session');
var logger = require('morgan');
var bCrypt = require('bcrypt-nodejs');

//MongoDB
var mongoose     = require('mongoose');
var mongodb      = require('mongodb');
var db 	= require ('./config/db');

//Connect til mongooseDB
mongoose.connect(db.url);

//Passport config
require('./config/passport')(passport);

//App
var app          = express();
var router = express.Router();
var port = process.env.PORT || 8000;

//App middleware - enable logger, session, body and cookie-parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: 'false',
  saveUninitialized: 'false'
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// static file location
app.use(express.static(path.join(__dirname, 'public')));

//MODELS - Schemas. 
var User = require('./app/models/users');
var Post = require('./app/models/post');

//ROUTES 
var authenticate = require('./app/routes/authenticate')(passport);
require('./app/routes/users.js')(router, mongoose, User);
require('./app/routes/post.js')(router, mongoose, Post);
require('./app/routes/authenticate.js')(passport);

// api call
app.use('/auth', authenticate);
app.use('/posts', Post);
app.use('/api', router);

app.use(function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Development error handler
if (app.get('env') === 'development') {
  mongoose.set('debug', true);
  app.use(function (err, req, res, next) {
    res.status(500).json({
      message: err.message,
      error: err
    });
  });
};

// Production error handler
app.use(function (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    error: err
  });
});

app.get('*', function (req, res) {
  res.sendfile('./public/index.html');
});

app.listen(port);
console.log('Server running on port ' + port);

exports = module.exports = app;