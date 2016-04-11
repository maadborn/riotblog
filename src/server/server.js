// simple express server
const express 	= require('express');
const app 		= express();
// const router 	= express.Router();
const tempdata 	= require('./tempdata');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
	res.sendFile('./public/index.html');
});

// TODO create api object to be shared by client and server, no magic connection strings needed
app.get('/api/posts', (req, res) => {
	// Get data, sort data with newest post first
	// TODO move to business layer
	debugger;
	const data = tempdata.posts.sort((a, b) => b.time - a.time);
	res.send(data);
});

app.listen(5000);