
import riot 		from 'riot';
import tempdata		from './tempdata';
import blogTag 		from '../tags/blog.tag';
import editorTag 	from '../tags/blog-editor.tag';
import postTag 		from '../tags/post.tag';

export default {

	posts: [],

	init() {
		riot.mount('blog', { 
			posts: this.loadPosts() 
		});
	},

	loadPosts() {
		this.posts = tempdata.posts;
		return this.posts;
	}

};
