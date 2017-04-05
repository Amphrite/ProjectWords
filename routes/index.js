var express = require('express');
var router = express.Router();

module.exports = function(router, Index){

	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.render('index', { title: "Chirp"});
	});
}