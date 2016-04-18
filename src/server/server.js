'use strict';

// simple express server
const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();
// const router 	= express.Router();
const tempdata 		= require('./tempdata');
const Api			= require('./common/api');
/* const db			= */require('./data/connector');
const userService	= require('./business/userservice');

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile('./public/index.html');
});

// Get all posts
app.get(Api.Posts, (req, res) => {
	// Get data, sort data with newest post first
	// TODO move to business layer
	const data = tempdata.posts.sort((a, b) => b.time - a.time);
	res.json(data);
});

// Login user with the supplied username and password
app.post(Api.UsersLogin, (req, res) => {
	const data = userService.verifyUser(req.body.username, req.body.pw);
	res.json(data);
});

// Create a new user
app.post(Api.Users, (req, res) => {
	const data = userService.createUser(req.body.username, req.body.pw);
	res.json(data);
});

app.listen(5000);
