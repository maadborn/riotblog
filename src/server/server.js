// simple express server
const express 	= require('express');
const app 		= express();
// const router 	= express.Router();
const tempdata 	= require('./tempdata');
const Api		= require('./common/api');

app.use(express.static(`${__dirname}/public`));

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
	// TODO move to business layer
	console.log(req.params);
	
	const data = {
		success: true,
		user: req.params.username,
		token: 'asdfasdf',
	};
	res.json(data);
});

app.listen(5000);
