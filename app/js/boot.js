/*'use strict';*/

//var app = require('./app');

import { App } from './app'

// Need a global for tags to access
//window.app = app;

let app = Object.create(App);

app.init();




class Asdf { 
	hello() { console.log('saying hello'); }
}
var a = new Asdf();
a.hello();