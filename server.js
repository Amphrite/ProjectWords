'use strict';

//Base server setup for REST API 
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

//Server setup
var mongoose = require('mongoose');
var db = require('./config/db');

// Connect to db
mongoose.connect(db.url);

// Passport configuration
require('./config/passport')(passport);

// Initial app setup, express and port
var app = express();
var http = require('http');
var server = http.createServer(app);
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

// Static file location
app.use(express.static(path.join(__dirname, 'public')));

// Models
var User = require('./app/models/user');

// Routes
var apiRoutes = require('./app/routes/api.route.js')();
var Routes = require('./app/routes/routes.js')(passport);
var appRoutes = require('./app/routes/app.route.js')();

app.use('/api', apiRoutes);
app.use('/auth', Routes);
app.use('/app', appRoutes);

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

server.listen(port);
console.log('Server running on port ' + port);

exports = module.exports = app; 