'use strict';

const User 	  	= require('../data/models/user');
const Promise 	= require('bluebird');
const bcrypt 	= Promise.promisifyAll(require('bcrypt'));

const UserService = {
	createCommenter(username, password) {
		return bcrypt.genSaltAsync(10)
			.then((salt) => bcrypt.hashAsync(password, salt))
			.then((hash) => User.createCommenter(username, hash))
			.then((user) => {
				return {
					username: user.username,
					token: 'asdfasdf',	// TODO Add JWT token... -ization?
				};
			})
			.catch((err) => {
				throw err;
			});
	},
	verifyUser(username, password) {
		return User.findOne({ username })
			.exec()
			.then((user) => {
				return (user && user.hashedPassword)
					? user.hashedPassword
					: 'thisisnotavalidhash';
			})
			.then((hash) => bcrypt.compareAsync(password, hash))
			.then((isMatch) => {
				if (!isMatch) {
					throw new Error('Invalid username or password');
				}
				
				return {
					username,
					token: 'asdfasdf',	// TODO Add JWT token... -ization?
				};
			})
			.catch((err) => {
				throw err;
			});
	},
};

module.exports = UserService;
