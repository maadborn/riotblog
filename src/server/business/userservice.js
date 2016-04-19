'use strict';

const User 		= require('../data/models/user');
const bcrypt 	= require('bcrypt');

const UserService = {
	createUser(username, password) {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) { console.error(err); }
			
			bcrypt.hash(password, salt, (err2, hash) => {
				if (err2) { console.error(err2); }
				
				User.saveCommenter(username, hash);
			});
		});
		
		return;
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
