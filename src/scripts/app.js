
import riot 		from 'riot';
import Router		from './router';
import tempdata		from './tempdata';

import aboutTag		from '../tags/about.tag';
import blogTag 		from '../tags/blog.tag';
import navTag 		from '../tags/blog-nav.tag';
import editorTag 	from '../tags/blog-editor.tag';
import postTag 		from '../tags/post.tag';
import postsTag		from '../tags/posts.tag';
import loginboxTag	from '../tags/loginbox.tag';

export default {

	router: null,

	init() {
		this.router = Object.create(Router);
		this.router.init('content');

		riot.mount('blog');
	}

};
