import AppEvents from '../../scripts/appevents';
import eventBus from '../../scripts/eventbus';
import { State, StateManager } from '../../scripts/statemanager';
import userService from '../../scripts/services/userservice';

const BlogNavTag = {
	init() {
		this.logXText = 'Login';
		this.showNewPost = false;
		
		eventBus.on(AppEvents.State.Authenticated, this.onAuthentication.bind(this));
		eventBus.on(AppEvents.State.Unauthenticated, this.onUnauthentication.bind(this));
	},
	
	onLogXButtonClick() {
		if (StateManager.hasState(State.Authenticated)) {
			// eventBus.trigger(AppEvents.State.Unauthenticated);
			userService.logout();
			return false;
		}
		return true;
	},

	onAuthentication() {
		this.logXText = 'Logout';
		this.showNewPost = true;
		this.update();
	},

	onUnauthentication() {
		this.logXText = 'Login';
		this.showNewPost = false;
		this.update();
	},
};

export default BlogNavTag;
