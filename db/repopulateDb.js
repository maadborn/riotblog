// Define collections
//var collections = ['Users', 'Roles'];

// Drop everything
// async.each(collections, function(collection, done) {
// 	db.collection(collection).drop(done);
// });

db.getCollectionNames()
	.forEach(function(collectionName) {
		db[collectionName].remove({});
	});

// Create roles
db.createCollection('roles');
db.roles.insertMany(
	[
		{ name: 'commenter' }, 
	 	{ name: 'author' }
	]);

// var users = db.collection('Users');
// Create a default admin
var authorRole = db.roles.findOne({ name: 'author' })
if (authorRole) {
	db.users.insertOne({
		username: 'admin',
		role: authorRole._id,
		hashedPassword: '$2a$10$vyER2bLkplWe4CwTdvP0juh0Kv8zlxDy6UQCDpDUwYHur00uR0X.W' //admin
	});
}



/*
var users = db.collection(users);
var total = 0;
async.whilst(
	function() { 
		return total < 100; 
	}, 
	function(done) {
 		//users.insert({ name: getNameString() }, done);
	},
	function() {
 		//all done
	});
*/
