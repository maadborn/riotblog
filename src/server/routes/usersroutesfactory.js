const Api			= require('../common/api');
const userService	= require('../business/userservice');

const UsersRoutesFactory = {
	addRoutes(app) {
		// Login user with the supplied username and password
		app.post(Api.UsersLogin, (req, res) => {
			userService.verifyUser(req.body.username, req.body.password, req.body.username)
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
	},
};

module.exports = UsersRoutesFactory;