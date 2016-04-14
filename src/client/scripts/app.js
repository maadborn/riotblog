import './vendor/fetch';

import riot 		from 'riot';
import router		from './router';
import eventBus 	from './eventbus';
import stateMgr		from './statemanager';

import '../tags/blog-app/blog-app.tag.html';
import '../tags/blog-about/blog-about.tag.html';
import '../tags/blog-edit/blog-edit.tag.html';
import '../tags/blog-editor/blog-editor.tag.html';
import '../tags/blog-nav/blog-nav.tag.html';
import '../tags/blog-post/blog-post.tag.html';
import '../tags/blog-posts/blog-posts.tag.html';
import '../tags/blog-toast/blog-toast.tag.html';
import '../tags/blog-test/blog-test.tag.html';
import '../tags/load-indicator/load-indicator.tag.html';
import '../tags/login-box/login-box.tag.html';
import '../tags/parsed-html/parsed-html.tag.html';

export default {
	router: null,
	eventBus: null,
	stateManager: null,
	init() {
		this.router = router;
		// string passed in here is the id of the element in which content should be loaded
		this.router.init('content');
		
		this.eventBus = eventBus;
		this.stateManager = stateMgr;

		riot.mount('blog-app');
	}
};
