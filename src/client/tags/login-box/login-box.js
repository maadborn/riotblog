import AppEvents from '../../scripts/appevents';
import eventBus from '../../scripts/eventbus';
import userService from '../../scripts/services/userservice';

const LoginBoxTag = {
	init() {
		eventBus.on(AppEvents.Elements.LoginBox.Toggle, this.toggle.bind(this));
		eventBus.on(AppEvents.State.Authenticated, this.onAuthentication.bind(this));
		eventBus.on(AppEvents.State.Unauthenticated, this.onUnauthentication.bind(this));
	},
	
	isOpen() {
		return (this.root.style.display !== 'none');
	},

	toggle() {
		if (this.isOpen()) {
			this.close();
		} else {
			this.open();
		}
	},

	open() {
		this.root.style.display = '';
		this.username.focus();
	},

	close() {
		this.root.style.display = 'none';
	},

	submitLogin(/* event */) {
		userService.login(this.username.value, this.password.value);
	},

	submitLogout(/* event */) {
		userService.logout(/* this.username.value */);
	},

	onAuthentication() {
		this.isAuthenticated = true;
		this.update();
		this.close();
	},

	onUnauthentication() {
		this.isAuthenticated = false;
		this.update();
		this.close();
	},
};

export default LoginBoxTag;
