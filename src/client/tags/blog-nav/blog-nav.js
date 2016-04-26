import AppEvents from '../../scripts/appevents';
import eventBus from '../../scripts/eventbus';

const BlogNavTag = {
	init() {
		this.logXText = 'Login';
		
		eventBus.on(AppEvents.State.Authenticated, this.onAuthentication.bind(this));
		eventBus.on(AppEvents.State.Unauthenticated, this.onUnauthentication.bind(this));
	},
	
	toggleLoginBox(event) {
		eventBus.trigger(AppEvents.Elements.LoginBox.Toggle);
		event.preventDefault();
		return false;
	},

	onAuthentication() {
		this.logXText = 'Logout';
		this.update();
	},

	onUnauthentication() {
		this.logXText = 'Login';
		this.update();
	},
};

export default BlogNavTag;
