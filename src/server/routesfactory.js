const PostsRoutesFactory = require('./routes/postsroutesfactory');
const UsersRoutesFactory = require('./routes/usersroutesfactory');

const RoutesFactory = {
	createRoutes(app) {
		// Add page entry route
		app.get('/', (req, res) => {
			res.sendFile('./public/index.html');
		});
		
		PostsRoutesFactory.addRoutes(app);
		UsersRoutesFactory.addRoutes(app);
	},
};

module.exports = RoutesFactory;
