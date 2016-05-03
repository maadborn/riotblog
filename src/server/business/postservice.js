'use strict';

const Post = require('../data/models/post');

const PostService = {
	savePost(title, body, username) {
		return Post.savePost(title, body, username);
	},
	// Get data, sort data with newest post first
	getPosts() {
		// TODO Better to move to model to get a certain subset, with skip and limit
		return Post.find({})
			.sort({ time: 'desc' })
			.exec();
	},
	getPost(id) {
		return id;
	},
};

module.exports = PostService;
