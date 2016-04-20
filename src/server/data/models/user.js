const mongoose 	 = require('mongoose');
mongoose.Promise = require('bluebird');
const Role 		 = require('./role');

const UserSchema = mongoose.Schema({
	username: String,
	role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
	hashedPassword: String,
});

UserSchema.methods.saveCommenter = (username, hash, cb) => {
	// Role.findOne({ name: 'commenter' }, '_id', (err, role) => {
	// 	const UserModel = this.model('User');
	// 	const user = new UserModel({
	// 		username,
	// 		hashedPassword: hash,
	// 		role: role._id,
	// 	});
		
	// 	user.save(cb);
	// });
	
	// Promisified version
	
	return Role.findOne({ name: 'commenter' })
		.select('_id')
		.exec()
		.then((roleId) => {
			const UserModel = this.model('User');
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

const User = mongoose.model('User', UserSchema);

module.exports = User;
