module.exports = function(router, mongoose, User){

router.route('/user')

	// Opretter et medlem
	.post(function(req, res) {
		
		var user = new User();		
		user.firstName = req.body.firstName;  
		user.lastName = req.body.lastName;
		user.email   =  req.body.email;
		user.phone =  req.body.phone; 
		user.username =  req.body.username;  
		user.password = req.body.password;

		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Der er oprettet et medlem!!' });
		});

		
	})

	// Henter ALLE medlemmer)
	.get(function(req, res) {
		User.find(function(err, user) {
			if (err)
				res.send(err);

			res.json(user);
		});
	});

router.route('/user/:user_id')

	// Get aka henter et medlem udfra ID
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	})

	// Opdatere et medlem med udfra ID
	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

			user.name = req.body.name;
			user.email = req.body.email;
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Medlem updated!' });
			});

		});
	})

	// Sletter en medlem med udfra ID
	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);

			res.json({ message: 'Bruger slettet' });
		});
	});

}
