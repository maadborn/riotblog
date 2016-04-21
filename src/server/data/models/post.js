const mongoose 	 = require('mongoose');
mongoose.Promise = require('bluebird');

const PostSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	time: Date,
	title: String,
	body: String,
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
