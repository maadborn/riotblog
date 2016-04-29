const mongoose 	 = require('mongoose');
mongoose.Promise = require('bluebird');
const Role 		 = require('./role');

const UserSchema = mongoose.Schema({
	username: String,
	role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
	hashedPassword: String,
});

UserSchema.statics.saveCommenter = function saveCommenter(username, hash, cb) {
	// TODO: upsert instead of create new?
	
	return Role.findOne({ name: 'commenter' })
		.select('_id')
		.exec()
		.then((roleId) => {
			const UserModel = this.model('user');
			const user = new UserModel({
				username,
				hashedPassword: hash,
				role: roleId,
			});
			
			return user.save(cb);
		})
		.catch((err) => {
			console.error('Failed in query to create commenter:', err);
		});
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
