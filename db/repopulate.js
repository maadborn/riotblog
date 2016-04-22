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
var authorRole = db.roles.findOne({ name: 'author' });
if (authorRole) {
	db.users.insertOne({
		username: 'admin',
		role: authorRole._id,
		hashedPassword: '$2a$10$vyER2bLkplWe4CwTdvP0juh0Kv8zlxDy6UQCDpDUwYHur00uR0X.W' //admin
	});
}


// Create posts
db.createCollection('posts');
var adminUser = db.users.findOne({ username: 'admin' });
if (adminUser) {
	db.posts.insertMany([
		{
			author: adminUser._id,
			time: new Date(Date.now() - 10000000),
			title: 'Hello',
			body: 'Lorem <a href="">ipsum</a> dolor sit amet, consectetur adipisicing elit. Ea '
				+ 'nemo vitae eaque, quia quod pariatur facere cum quidem, fugit in! Quidem minima '
				+ 'necessitatibus pariatur. Optio, minus omnis? Sunt excepturi, adipisci!'
		},
		{
			author: adminUser._id,
			time: new Date(2016, 2, 3, 12, 34),
			title: 'Hello again!',
			body: 'Blanditiis laboriosam impedit quibusdam sit, dicta eaque tempore, aliquam '
				+ 'quis incidunt. Autem accusantium recusandae, quis obcaecati eveniet inventore. '
				+ 'Fugit explicabo obcaecati, voluptate repellat vel, asperiores deserunt facere '
				+ 'saepe iste est.'
		},
		{
			author: adminUser._id,
			time: new Date(2016, 1, 3, 12, 34),
			title: 'Hello again!',
			body: 'Blanditiis laboriosam impedit quibusdam sit, dicta eaque tempore, aliquam '
				+ 'quis incidunt. Autem accusantium recusandae, quis obcaecati eveniet inventore. '
				+ 'Fugit explicabo obcaecati, voluptate repellat vel, asperiores deserunt facere '
				+ 'saepe iste est.'
		},
		{
			author: adminUser._id,
			time: new Date(2016, 4, 3, 12, 34),
			title: 'Hello again!',
			body: 'Blanditiis laboriosam impedit quibusdam sit, dicta eaque tempore, aliquam '
				+ 'quis incidunt. Autem accusantium recusandae, quis obcaecati eveniet inventore. '
				+ 'Fugit explicabo obcaecati, voluptate repellat vel, asperiores deserunt facere '
				+ 'saepe iste est.'
		},
		{
			author: adminUser._id,
			time: new Date(2016, 3, 3, 12, 34),
			title: 'Hello again!',
			body: 'Blanditiis laboriosam impedit quibusdam sit, dicta eaque tempore, aliquam '
				+ 'quis incidunt. Autem accusantium recusandae, quis obcaecati eveniet inventore. '
				+ 'Fugit explicabo obcaecati, voluptate repellat vel, asperiores deserunt facere '
				+ 'saepe iste est.'
		},
	]);
}