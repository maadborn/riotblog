/*'use strict';*/

var riot 			= require('riot');

var blogTag 		= require('../tags/blog.tag');
var blogEditorTag 	= require('../tags/blog-editor.tag');
var postTag 		= require('../tags/post.tag');

var tempdata 		= require('./tempdata.js');

console.log('entering app.js');

export const App = {};

App.posts = [];

App.init = function() {
	console.log('in app.init');
	riot.mount('blog', { posts: this.loadPosts() });
	// riot.mount('blog-editor');
};

App.loadPosts = function() {
	App.posts = tempdata.posts;
	return App.posts;
};

console.log('leaving app.js');

//module.exports = app;
// export default app

//export function test() { console.log('testing'); }