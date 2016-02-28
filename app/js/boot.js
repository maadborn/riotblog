'use strict';

var app = require('./app');

// Need a global for tags to access
//window.app = app;

app.init();




class Asdf { 
	hello() { console.log('saying hello'); }
}
var a = new Asdf();
a.hello();