import moment from 'moment';

const BlogPostTag = {
	init() {
		this.relativeTime = moment(this.opts.post.time).fromNow();
		this.absoluteTime = moment(this.opts.post.time).format('YYYY-MM-DD HH:mm');
	}
};

export default BlogPostTag;
