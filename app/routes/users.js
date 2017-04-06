module.exports = function(router, mongoose, User){

router.route('/user')

	// Opretter et medlem
	.post(function(req, res) {
		
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
	.get(function(req, res) {
		User.find(function(err, user) {
			if (err)
				res.send(err);

			res.json(user);
		});
	});

}
