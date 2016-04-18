const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	time: Date,
	text: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
