const mongoose 	 = require('mongoose');
mongoose.Promise = require('bluebird');

const CommentSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	time: Date,
	text: String,
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
