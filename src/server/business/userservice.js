'use strict';

const User 	  	= require('../data/models/user');
const Promise 	= require('bluebird');
const bcrypt 	= Promise.promisifyAll(require('bcrypt'));

const UserService = {
	createCommenter(username, password) {
		// bcrypt.genSalt(10, (err, salt) => {
		// 	if (err) { console.error(err); }
			
		// 	bcrypt.hash(password, salt, (err2, hash) => {
		// 		if (err2) { console.error(err2); }
				
		// 		User.saveCommenter(username, hash);
		// 	});
		// });
		
		// return;
		
		// Async version
		
		return bcrypt.genSaltAsync(10)
			.then((salt) => bcrypt.hashAsync(password, salt))
			.then((hash) => User.saveCommenter(username, hash))
			// TODO .then remap to a user response object, don't send the complete object back
			// add jwt token to object
			.catch((err) => {
				console.error('Failed to create user:', err);
			});
	},
	verifyUser(username, password) {
		// TODO implement pw hashing and db saving
		let data = {
			success: false,
			reason: 'Invalid username or password',
			user: username,
			token: null,
		};
		
		if (username === 'apa' && password === 'asdf') {
			data = {
				success: true,
				reason: '',
				user: username,
				token: 'asdfasdf',
			};
		}
		
		return data;
	},
};

module.exports = UserService;
