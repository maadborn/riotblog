const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	username: String,
	hashedPassword: String,
});

const User = mongoose.model('User', UserSchema);

console.log('user!');

module.exports = User;
