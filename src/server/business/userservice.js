'use strict';

const User 	  	= require('../data/models/user');
const Promise 	= require('bluebird');
const bcrypt 	= Promise.promisifyAll(require('bcrypt'));

const UserService = {
	createCommenter(username, password) {
		// TODO: check if username exists, if yes, then return
		
		const promise = bcrypt.genSaltAsync(10)
			.then((salt) => bcrypt.hashAsync(password, salt))
			.then((hash) => User.saveCommenter(username, hash))
			.then((user) => {
				// TODO Add a function object/constructor for creating these kinds object
				let data = {
					success: false,
					reason: 'Failed to return user object',
					user: username,
					token: null,
				};
				
				if (user) {
					data = {
						success: true,
						reason: '',
						user: username,
						token: 'asdfasdf',	// TODO Add JWT token... -ization?
					};
				}
				
				return data;
			})
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
				// TODO Add a function object/constructor for creating these kinds object
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
						token: 'asdfasdf',	// TODO Add JWT token... -ization?
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
