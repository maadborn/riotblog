import riot 		from 'riot';
import router		from './router';
import eventBus 	from './eventbus';
import tempdata		from './tempdata';
import eventBusMixin from './eventbusmixin';
import momentMixin	from './momentmixin';

import parsedTag	from '../tags/parsed-html.tag.html';
import aboutTag		from '../tags/blog-about.tag.html';
import blogTag 		from '../tags/blog-app.tag.html';
import navTag 		from '../tags/blog-nav.tag.html';
import editorTag 	from '../tags/blog-editor.tag.html';
import postTag 		from '../tags/blog-post.tag.html';
import postsTag		from '../tags/blog-posts.tag.html';
import loginboxTag	from '../tags/login-box.tag.html';

export default {
	router: null,
	eventBus: null,
	init() {
		this.router = router;
		// string passed in here is the id of the element in which content should be loaded
		this.router.init('content');
		
		this.eventBus = eventBus;
		
		// use a global mixin, adding the eventbus
		// "carpet bombing" here now, might refactor if it is deemed unnecessary
		riot.mixin(eventBusMixin);
		
		riot.mixin('momentMixin', momentMixin);

		riot.mount('blog-app');
	}
};
