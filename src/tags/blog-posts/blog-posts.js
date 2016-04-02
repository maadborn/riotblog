import AppEvents from '../../scripts/appevents';
import eventBus from '../../scripts/eventbus';

const BlogPostsTag = {
	init() {
		this.posts = this.opts.posts;
		eventBus.on(AppEvents.Data.Posts.Updated, this.update.bind(this));
	}
};

export default BlogPostsTag;
