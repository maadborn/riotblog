var tempdata = require('./tempdata.js');

console.log('entering app.js');

var app = {};

app.posts = [];

app.init = function() {
	riot.mount('blog-app');
	// riot.mount('blog-editor');
};

app.loadPosts = function() {
	app.posts = tempdata.posts;
	return app.posts;
};

module.exports = app;

console.log('leaving app.js');
