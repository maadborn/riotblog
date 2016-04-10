import AppEvents from '../../scripts/appevents';
import eventBus from '../../scripts/eventbus';

const BlogNavTag = {
	init() {
		this.logXText = 'Login';
		
		eventBus.on(AppEvents.State.Authenticated, this.reactToAuthentication.bind(this));
		eventBus.on(AppEvents.State.Unauthenticated, this.reactToUnauthentication.bind(this));
	},
	
	toggleLoginBox(event) {
		eventBus.trigger(AppEvents.Elements.LoginBox.Toggle);
		event.preventDefault();
		return false;
	},

	reactToAuthentication() {
		this.logXText = 'Logout';
		this.update();
	},

	reactToUnauthentication() {
		this.logXText = 'Login';
		this.update();
	},
};

export default BlogNavTag;
