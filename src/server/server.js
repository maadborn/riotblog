'use strict';

// simple express server
const express 		= require('express');
const bodyParser 	= require('body-parser');
/* const db			= */require('./data/connector');
const RoutesFactory		= require('./routesfactory');
const app 			= express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

RoutesFactory.createRoutes(app);

app.listen(5000);
