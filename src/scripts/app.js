import riot 		from 'riot';
import Router		from './router';
import EventBus 	from './eventbus';
import tempdata		from './tempdata';

import rawTag		from '../tags/raw-span.tag.html';
import aboutTag		from '../tags/blog-about.tag.html';
import blogTag 		from '../tags/blog-app.tag.html';
import navTag 		from '../tags/blog-nav.tag.html';
import editorTag 	from '../tags/blog-editor.tag.html';
import postTag 		from '../tags/blog-post.tag.html';
import postsTag		from '../tags/blog-posts.tag.html';
import loginboxTag	from '../tags/login-box.tag.html';

export default {
	router: null,
	eventBus: EventBus,
	init() {
		this.router = Router; // Object.create(Router);
		// string passed in here is the id of the element in which content should be loaded
		this.router.init('content');

		riot.mount('blog-app');
	}
};
