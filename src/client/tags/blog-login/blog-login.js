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
		const username = this.signupform.elements.username.value;
		const password = this.signupform.elements.password.value;
		const passwordRepeat = this.signupform.elements.passwordRepeat.value;
		
		if (!this.validateSignup(username, password, passwordRepeat)) {
			return;
		}
		
		userService.signup(username, password, passwordRepeat);
		// TODO Ask state if authenticated, if yes, redirect to ??
	},
	
	validateLogin(username, password) {
		if (!username || !password) {
			eventBus.trigger(
				AppEvents.Elements.Toast.Show,
				'The login form is not filled out correctly',
				'warning');
			return false;
		}
		return true;
	},
	validateSignup(username, password, passwordRepeat) {
		if (!username || !password || !passwordRepeat) {
			eventBus.trigger(
				AppEvents.Elements.Toast.Show,
				'The signup form is not filled out correctly',
				'warning');
			return false;
		}
		if (password !== passwordRepeat) {
			eventBus.trigger(
				AppEvents.Elements.Toast.Show,
				'The passwords does not match',
				'warning');
			return false;
		}
		return true;
	},
};

export default BlogLoginTag;
