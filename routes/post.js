module.exports = function(router, mongoose, Post){

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// Hvis brugeren er Authenticated, kører next() for at kalde den next request handler 
	// Passport tilføjer denne metode til requrest objekter. Middleware er tilladt for at tilføje egenskaber 
	//til request and response objects

	//Hvis authenticated må man kører GET request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// Hvis brugeren ikke er Autenticated bliver man smidt tilbage til login/registration
	return res.redirect('/');
};

//Registere authentication middleware
router.use('/posts', isAuthenticated);

router.route('/posts')
	//Laver et nyt post!
	.post(function(req, res){	
    	var post = new Post();
		post.title = req.body.title;
		post.desc = req.body.desc;
		post.tags = req.body.tags;
		post.created_by = req.body.created_by;
		post.latitude = req.body.latitude;
		post.longitude = req.body.longitude;
		post.imageName = req.body.imageName;
		post.image = req.body.image;

		post.save(function(err, post) {
			if (err){
				console.log(err);
				//return res.send(500, err);
			}
			return res.json(post);
		});  		
	})

	//henter alle posts
	.get(function(req, res){
		console.log('Get call');
		Post.find(function(err, posts){
			console.log('Post call');
			if(err){
				return res.send(500, err);
			}
			return res.send(200,posts);
		});
	});

//Unikke post - GET
router.route('/posts/:id')
	//Henter/GET det unikke post via id
	.get(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);
			res.json(post);
		});
	}) 
	//updatere det unikke post
	.put(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);

			post.created_by = req.body.created_by;
			post.created_at = req.body.created_at;
			post.title = req.body.title;
			post.desc = req.body.desc;
			post.tags = req.body.tags;
			post.comments = req.body.comments;

			post.save(function(err, post){
				if(err)
					res.send(err);
				res.json(post);
			});
		});
	})
	//sletter et post via id
	.delete(function(req, res) {
		Post.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted");
		});
	});
}