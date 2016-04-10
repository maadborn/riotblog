import riot 		from 'riot';
import router		from './router';
import eventBus 	from './eventbus';
import stateMgr		from './statemanager';

// import evtBusMixin 	from './mixins/eventbusmixin';
// import momentMixin	from './mixins/momentmixin';
// import userSvcMixin	from './mixins/userservicemixin';
// import dataSvcMixin	from './mixins/dataservicemixin';

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
		// this.stateManager.init();
		
		/* USING JS IMPORTS TO GAIN ACCESS TO THESE OBJECTS INSTEAD */
		// use a global mixin, adding the eventbus
		// "carpet bombing" here now, might refactor if it is deemed unnecessary
		// riot.mixin(evtBusMixin);
		
		// riot.mixin('momentMixin', momentMixin);
		// riot.mixin('userServiceMixin', userSvcMixin);
		// riot.mixin('dataServiceMixin', dataSvcMixin);

		riot.mount('blog-app');
	}
};
