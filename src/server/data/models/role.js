const mongoose 	 = require('mongoose');
mongoose.Promise = require('bluebird');

const RoleSchema = mongoose.Schema({
	name: String,
});

const Role = mongoose.model('role', RoleSchema);

module.exports = Role;
