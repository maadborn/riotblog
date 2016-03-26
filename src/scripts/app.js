import riot 		from 'riot';
import router		from './router';
import eventBus 	from './eventbus';
import stateMgr		from './statemanager';
// import tempdata		from './tempdata';

import evtBusMixin 	from './mixins/eventbusmixin';
import momentMixin	from './mixins/momentmixin';
import userSvcMixin	from './mixins/userservicemixin';
import dataSvcMixin	from './mixins/dataservicemixin';

import parsedTag	from '../tags/parsed-html.tag.html';
import aboutTag		from '../tags/blog-about.tag.html';
import blogTag 		from '../tags/blog-app.tag.html';
import navTag 		from '../tags/blog-nav.tag.html';
import editTag 		from '../tags/blog-edit.tag.html';
import editorTag 	from '../tags/blog-editor.tag.html';
import postTag 		from '../tags/blog-post.tag.html';
import postsTag		from '../tags/blog-posts.tag.html';
import loginboxTag	from '../tags/login-box.tag.html';
import loaderTag	from '../tags/load-indicator.tag.html';

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
		
		// use a global mixin, adding the eventbus
		// "carpet bombing" here now, might refactor if it is deemed unnecessary
		riot.mixin(evtBusMixin);
		
		riot.mixin('momentMixin', momentMixin);
		riot.mixin('userServiceMixin', userSvcMixin);
		riot.mixin('dataServiceMixin', dataSvcMixin);

		riot.mount('blog-app');
	}
};
