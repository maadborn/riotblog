const mongoose 	 = require('mongoose');
mongoose.Promise = require('bluebird');

const User 	 	 = require('./user');

const PostSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	time: Date,
	title: String,
	body: String,
});

PostSchema.statics.savePost = function upsertPost(title, body, username) {
	// TODO: upsert instead of create new?
	
	return User.findOne({ username })
		.select('_id')
		.exec()
		.then((userId) => {
			if (!userId) {
				throw new Error(`User ${username} could not be found`);
			}
			
			const PostModel = this.model('post');
			const post = new PostModel({
				author: userId,
				time: new Date(),
				title,
				body,
			});
			
			return post.save();
		})
		.catch((err) => {
			console.error('Failed in query to save post:', err);
		});
};

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
