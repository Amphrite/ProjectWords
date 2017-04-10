var express = require('express');
var router = express.Router();
var User = require('./../models/users'); 


module.exports = function(){



	// Opretter et medlem
	router.post('/user', function(req, res) {
		
		var user = new User();		
		user.username =  req.body.username;  
		user.password = req.body.password;

		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Der er oprettet et medlem!!' });
		});

		
	})

	// Henter ALLE medlemmer)
	router.get('/user',function(req, res) {
		User.find(function(err, user) {
			if (err)
				res.send(err);

			res.json(user);
		});
	});

	return router;

}

