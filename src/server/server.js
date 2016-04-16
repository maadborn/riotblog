'use strict';

// simple express server
const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();
// const router 	= express.Router();
const tempdata 		= require('./tempdata');
const Api			= require('./common/api');

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.sendFile('./public/index.html');
});

app.get(Api.Posts, (req, res) => {
	// Get data, sort data with newest post first
	// TODO move to business layer
	const data = tempdata.posts.sort((a, b) => b.time - a.time);
	res.json(data);
});

app.post(Api.Login, (req, res) => {
	console.log(req.body);
	
	// TODO move to business layer
	let data = {
		success: false,
		reason: 'Invalid username or password',
		user: req.body.username,
		token: null,
	};
	
	if (req.body.username === 'apa' && req.body.pw === 'asdf') {
		data = {
			success: true,
			reason: '',
			user: req.body.username,
			token: 'asdfasdf',
		};
	}
	
	console.log(data);
	res.json(data);
});

app.listen(5000);
