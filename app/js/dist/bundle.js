(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var tempdata = require('./tempdata.js');

console.log('entering app.js');

var app = {};

app.posts = [];

app.init = function () {
	riot.mount('blog-app');
	// riot.mount('blog-editor');
};

app.loadPosts = function () {
	app.posts = tempdata.posts;
	return app.posts;
};

module.exports = app;

console.log('leaving app.js');

},{"./tempdata.js":3}],2:[function(require,module,exports){
/*requirejs(['app'], function(app) {
	app.init();
});*/

var app = require('./app.js');

window.app = app;

app.init();

},{"./app.js":1}],3:[function(require,module,exports){
module.exports = {
	posts: [{
		header: 'Hello',
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nemo vitae eaque, quia quod pariatur facere cum quidem, fugit in! Quidem minima necessitatibus pariatur. Optio, minus omnis? Sunt excepturi, adipisci!'
	}, {
		header: 'Hello again!',
		content: 'Blanditiis laboriosam impedit quibusdam sit, dicta eaque tempore, aliquam quis incidunt. Autem accusantium recusandae, quis obcaecati eveniet inventore. Fugit explicabo obcaecati, voluptate repellat vel, asperiores deserunt facere saepe iste est.'
	}]
};

},{}]},{},[2])
//# sourceMappingURL=bundle.js.map
