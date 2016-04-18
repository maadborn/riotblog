// Define collections
var collections = ['Users', 'Roles'];

// Drop everything
async.each(collections, function(collection, done) {
	db.collection(collection).drop(done);
});

// Create roles
var roles = db.collection('Roles');
roles.insertMany({
	name: 'commenter'
}, {
	name: 'author'
});

/*
var users = db.collection('Users');
roles.findOne({ name: 'author' }).then(function(doc) {
	users.insertOne({
		username: 'admin',
		role: doc._id,
		// HASH HERE!!!
	});
});
*/

// Create a default admin


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
