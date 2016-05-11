'use strict';

const apiHelpers = require('./apihelpers');

const api = {
	// Posts
	Posts: 		'posts',
	// Users
	Users: 		'users',
	UsersLogin: 'users/login',
	UsersLogout:'users/logout',
};

const prefixedApi = apiHelpers.prefixApi(api);

module.exports = prefixedApi;
