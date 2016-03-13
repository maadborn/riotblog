import riot 		from 'riot';
import Router		from './router';
import EventBus 	from './eventBus';
import tempdata		from './tempdata';

import rawTag		from '../tags/raw.tag';
import aboutTag		from '../tags/about.tag';
import blogTag 		from '../tags/blog.tag';
import navTag 		from '../tags/blog-nav.tag';
import editorTag 	from '../tags/blog-editor.tag';
import postTag 		from '../tags/post.tag';
import postsTag		from '../tags/posts.tag';
import loginboxTag	from '../tags/loginbox.tag';

export default {
	router: null,
	eventBus: EventBus,
	init() {
		this.router = Object.create(Router);
		// string passed in here is the id of the element in which content should be loaded
		this.router.init('content');

		riot.mount('blog');
	},
};
