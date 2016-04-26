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
			eventBus.trigger(
				AppEvents.Elements.Toast.Show,
				'Username or password missing',
				'warning');
			return;
		}
		
		userService.login(username, password);
	},
	submitSignup(/* event */) {
		const username = this.loginform.elements.username.value;
		const password = this.loginform.elements.password.value;
		const passwordRepeat = this.loginform.elements.passwordRepeat.value;
		
		if (!this.validateSignup(username, password)) {
			eventBus.trigger(
				AppEvents.Elements.Toast.Show,
				'Signup form is not filled out correctly',
				'warning');
			return;
		}
		
		userService.signup(username, password, passwordRepeat);
	},
	
	validateLogin(username, password) {
		if (username && password) {
			return true;
		}
		return false;
	},
	validateSignup(username, password, passwordRepeat) {
		if (username && password && passwordRepeat) {
			return true;
		}
		if (password !== passwordRepeat) {
			return true;
		}
		return false;
	},
};

export default BlogLoginTag;
