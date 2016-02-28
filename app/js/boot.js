/*requirejs(['app'], function(app) {
	app.init();
});*/

var app = require('./app.js');

window.app = app;

app.init();