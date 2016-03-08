
import riot 		from 'riot';
import Router		from './router';
import tempdata		from './tempdata';

import aboutTag		from '../tags/about.tag';
import blogTag 		from '../tags/blog.tag';
import navTag 		from '../tags/blog-nav.tag';
import editorTag 	from '../tags/blog-editor.tag';
import postTag 		from '../tags/post.tag';
import postsTag		from '../tags/posts.tag';


export default {

	router: null,
	posts: [],

	init() {
		this.router = Object.create(Router);
		this.router.init('content');

		riot.mount('blog'/*, { 
			posts: this.loadPosts() 
		}*/);
	}/*,

	loadPosts() {
		this.posts = tempdata.posts;
		return this.posts;
	}*/

};
