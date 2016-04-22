'use strict';

const Post = require('../data/models/post');

const PostService = {
	savePost() {
	},
	// Get data, sort data with newest post first
	getPosts() {
		// TODO Better to move to model to get a certain subset, with skip and limit
		return Post.find({})
			.sort({ time: 'desc' })
			.exec();
	},
	getPost(id) {
	},
};

module.exports = PostService;
