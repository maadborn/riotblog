const mongoose 	= require('mongoose');
const Role 		= require('./role');

const UserSchema = mongoose.Schema({
	username: String,
	role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
	hashedPassword: String,
});

UserSchema.methods.saveCommenter = function saveCommenter(username, hash, cb) {
	Role.findOne({ name: 'commenter' }, '_id', (err, role) => {
		const UserModel = this.model('User');
		const user = new UserModel({
			username,
			hashedPassword: hash,
			role: role._id,
		});
		
		user.save(cb);
	});
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
