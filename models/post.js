var mongoose = require('mongoose');
var Schema   = mongoose.Schema; 

var commentSchema = new mongoose.Schema({
	created_by: String,
	comment: String,
	created_at: {
		type: Date, 
		default: Date.now
	}
});

var postSchema = new mongoose.Schema({
	created_by: String,
	created_at: {type: Date, default: Date.now},
	imageName: String,
	image: String,
	title: String,
	desc: String,
	tags: String,
	latitude: String,
	longitude: String,
	comments: [commentSchema]
});


module.exports = mongoose.model('Comment', commentSchema);
module.exports = mongoose.model('Post', postSchema);