var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var ctrlProfile = require('../controllers/hej');
var ctrlAuth = require('../controllers/authentication');

module.exports = function(){

// profile
router.get('/hej', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

return router;

}

