// Base Setup for the server - NODE.JS plugins
var express      = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var path         = require('path');
var session      = require('express-session');
var passport     = require('passport');
var logger       = require('morgan');

//MongoDB
var mongoose     = require('mongoose');
var mongodb      = require('mongodb');

//App
var app          = express();
var port         = 1337;


//Connect til mongooseDB
mongoose.connect('mongodb://localhost/');

//MODELS - Schemas. 
var User = require('./models/users');
var Post = require('./models/post');

//ROUTES 
var router = express.Router();
var authenticate = require('./routes/authenticate')(passport);
require('./routes/users.js')(router, mongoose, User);
require('./routes/post.js')(router, mongoose, Post);
require('./routes/authenticate.js')(passport);


app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: 'true',
  saveUninitialized: 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authenticate);
app.use('/posts', Post);
app.use('/api', router);



//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);


app.get('/', function(req, res){
	res.sendFile('../index.html');
});


//Test om der er forbindelse til API
router.get('/', function(req, res) {
	res.json({ message: 'Apiet virker, der er hul igennem du'});
});


//Besked til console når der oprettes/slettes i DB
router.use(function(res, req, next) {
	console.log('Der sker noget her!')
	next();
});


//Consol besked ved start af server
app.listen(port);
console.log('We are live on port ' + port);

module.exports = app; 