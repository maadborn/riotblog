import AppEvents from '../../scripts/appevents';
import eventBus from '../../scripts/eventbus';
import userService from '../../scripts/services/userservice';

const BlogLoginTag = {
	init() {
		
	},
	submitLogin(/* event */) {
		userService.login(this.username.value, this.password.value);
	},
};

export default BlogLoginTag;
