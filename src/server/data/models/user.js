const mongoose 	 = require('mongoose');
mongoose.Promise = require('bluebird');
const Role 		 = require('./role');

const UserSchema = mongoose.Schema({
	username: String,
	role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
	hashedPassword: String,
});

UserSchema.statics.createCommenter = function createCommenter(username, hash, cb) {
	return this.findOne({ username })
		.exec()
		.then((user) => {
			if (user) {
				throw new Error('Username already in use');
			}
			
			return Role.findOne({ name: 'commenter' })
				.select('_id')
				.exec();
		})
		.then((roleId) => {
			// "new this" isn't the most readable form :/
			const user = new this({
				username,
				hashedPassword: hash,
				role: roleId,
			});
			
			return user.save(cb);
		})
		.catch((err) => {
			throw err;
		});
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
