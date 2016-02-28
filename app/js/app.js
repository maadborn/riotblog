'use strict';

var riot 			= require('riot');

var blogTag 		= require('../tags/blog.tag');
var blogEditorTag 	= require('../tags/blog-editor.tag');
var postTag 		= require('../tags/post.tag');

var tempdata 		= require('./tempdata.js');

console.log('entering app.js');

var app = {};

app.posts = [];

app.init = function() {
	console.log('in app.init');
	riot.mount('blog', { posts: this.loadPosts() });
	// riot.mount('blog-editor');
};

app.loadPosts = function() {
	app.posts = tempdata.posts;
	return app.posts;
};

module.exports = app;

console.log('leaving app.js');
