'use strict';

const User 	  	= require('../data/models/user');
const Promise 	= require('bluebird');
const bcrypt 	= Promise.promisifyAll(require('bcrypt'));

const UserService = {
	createCommenter(username, password) {
		const promise = bcrypt.genSaltAsync(10)
			.then(salt => bcrypt.hashAsync(password, salt))
			.then(hash => User.saveCommenter(username, hash))
			// TODO .then remap to a user response object, don't send the complete object back
			// add jwt token to object
			.catch((err) => {
				console.error('Failed to create user:', err);
			});
			
		return promise;
	},
	verifyUser(username, password) {
		const promise = User.findOne({ username })
			.exec()
			.then((user) => {
				return (user && user.hashedPassword)
					? user.hashedPassword
					: 'thisisnotavalidhash';
			})
			.then((hash) => bcrypt.compareAsync(password, hash))
			.then((isVerified) => {
				// TODO Add JWT token... -ization?
				
				let data = {
					success: false,
					reason: 'Invalid username or password',
					user: username,
					token: null,
				};
				
				if (isVerified) {
					data = {
						success: isVerified,
						reason: '',
						user: username,
						token: 'asdfasdf',
					};
				}
				
				return data;
			})
			.catch((err) => {
				console.error('Failed to verify user:', err);
			});
			
		return promise;
	},
};

module.exports = UserService;
