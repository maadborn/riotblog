import eventBus from '../eventbus';
import AppEvents from '../appevents';
import Api from '../../../common/api';

const UserService = {
	login(username, pw) {
		eventBus.trigger(AppEvents.State.Loading);
		
		console.log('logging in', username, pw);
		
		const p = fetch(Api.UsersLogin, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, pw }),
		})
		.then((res) => res.json())
		.then((json) => {
			if (json.success) {
				eventBus.trigger(AppEvents.Elements.Toast.Show, `Logged in as ${json.user}`, 'success');
				eventBus.trigger(AppEvents.State.Authenticated, json.user);
			} else {
				eventBus.trigger(AppEvents.Elements.Toast.Show, `Login failed: ${json.reason}`, 'error');
			}
		})
		.catch((reason) => {
			eventBus.trigger(AppEvents.Elements.Toast.Show, `Login failed: ${reason}`, 'error');
		})
		.then(() => {
			eventBus.trigger(AppEvents.State.Loaded);
		});
		
		return p;
	},
	logout() {
		// TODO: implementation
		eventBus.trigger(AppEvents.State.Unauthenticated);
		eventBus.trigger(AppEvents.Elements.Toast.Show, 'Logged out', 'success');
	}
};

export default UserService;
