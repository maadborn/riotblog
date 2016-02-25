define(
	'app', 
	['tempdata'],
	function(tempdata) {

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

		window.app = app;

		console.log('app return');
		return app;
	}
);
