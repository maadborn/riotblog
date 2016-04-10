
'use strict';

// simple express server
var express = require('express');
var app 	= express();
var router 	= express.Router();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});

app.listen(5000);
