const Api			= require('./common/api');
const userService	= require('./business/userservice');
const postService	= require('./business/postservice');

function router(app) {
	app.get('/', (req, res) => {
		res.sendFile('./public/index.html');
	});

	// Get all posts
	app.get(Api.Posts, (req, res) => {
		postService.getPosts()
			.then((posts) => {
				res.json(posts);
			});
	});

	// Login user with the supplied username and password
	app.post(Api.UsersLogin, (req, res) => {
		userService.verifyUser(req.body.username, req.body.password)
			.then((userData) => {
				res.json(userData);
			})
			.catch((err) => {
				res.json({ err });
			});
	});

	// Create a new user
	app.post(Api.Users, (req, res) => {
		userService.createCommenter(req.body.username, req.body.password)
			.then((userData) => {
				res.json(userData);
			})
			.catch((err) => {
				res.json({ err });
			});
	});
}

module.exports = router;
