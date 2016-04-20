const tempdata 		= require('./tempdata');
const Api			= require('./common/api');
const userService	= require('./business/userservice');

function router(app) {
	app.get('/', (req, res) => {
		res.sendFile('./public/index.html');
	});

	// Get all posts
	app.get(Api.Posts, (req, res) => {
		// Get data, sort data with newest post first
		// TODO move to business layer
		const data = tempdata.posts.sort((a, b) => b.time - a.time);
		res.json(data);
	});

	// Login user with the supplied username and password
	app.post(Api.UsersLogin, (req, res) => {
		const data = userService.verifyUser(req.body.username, req.body.pw);
		res.json(data);
	});

	// Create a new user
	app.post(Api.Users, (req, res) => {
		userService.createCommenter(req.body.username, req.body.pw)
			.then((userData) => {
				res.json(userData);
			})
			.catch((err) => {
				res.json({ err });
			});
	});
}

module.exports = router;
