const mongoose 	 = require('mongoose');
mongoose.Promise = require('bluebird');

const PostSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	time: Date,
	title: String,
	body: String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
