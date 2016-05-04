const Api			= require('../common/api');
const postService	= require('../business/postservice');

const PostsRoutesFactory = {
	addRoutes(app) {
		// Get all posts
		app.get(Api.Posts, (req, res) => {
			postService.getPosts()
				.then((posts) => {
					res.json(posts);
				})
				.catch((err) => {
					res.json({ err });
				});
		});
			
		// Create post
		app.post(Api.Posts, (req, res) => {
			postService.savePost(req.body.title, req.body.body, req.body.username)
				.then((post) => {
					res.json(post);
				})
				.catch((err) => {
					res.json({ err });
				});
		});
	},
};

module.exports = PostsRoutesFactory;
