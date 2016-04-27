import AppEvents from '../../scripts/appevents';
import eventBus from '../../scripts/eventbus';
import userService from '../../scripts/services/userservice';

const BlogLoginTag = {
	init() {
		
	},
	
	submitLogin(/* event */) {
		const username = this.loginform.elements.username.value;
		const password = this.loginform.elements.password.value;
		
		if (!this.validateLogin(username, password)) {
			return;
		}
		
		userService.login(username, password);
	},
	submitSignup(/* event */) {
		const username = this.loginform.elements.username.value;
		const password = this.loginform.elements.password.value;
		const passwordRepeat = this.loginform.elements.passwordRepeat.value;
		
		if (!this.validateSignup(username, password)) {
			return;
		}
		
		userService.signup(username, password, passwordRepeat);
	},
	
	validateLogin(username, password) {
		if (username && password) {
			eventBus.trigger(
				AppEvents.Elements.Toast.Show,
				'The login form is not filled out correctly',
				'warning');
			return true;
		}
		return false;
	},
	validateSignup(username, password, passwordRepeat) {
		if (username && password && passwordRepeat) {
			eventBus.trigger(
				AppEvents.Elements.Toast.Show,
				'The signup form is not filled out correctly',
				'warning');
			return true;
		}
		if (password !== passwordRepeat) {
			eventBus.trigger(
				AppEvents.Elements.Toast.Show,
				'The passwords does not match',
				'warning');
			return true;
		}
		return false;
	},
};

export default BlogLoginTag;
