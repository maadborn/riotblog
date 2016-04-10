// simple express server
const express = require('express');
const app 	= express();
const router 	= express.Router();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile('./public/index.html');
});

app.listen(5000);
