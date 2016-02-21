var app = {};

(function(app) {
	app.init = function() {
		riot.mount('blog-app');
		riot.mount('blog-editor');
	};
})(app);

app.init();
