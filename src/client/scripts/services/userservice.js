import eventBus 	from '../eventbus';
import AppEvents 	from '../appevents';
import Api 			from '../../../common/api';
import riot			from 'riot';

const UserService = {
	login(username, password) {
		eventBus.trigger(AppEvents.State.Loading);
		
		console.log('logging in', username, password);
		
		const promise = fetch(Api.UsersLogin, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		})
		.then((res) => res.json())
		.then((json) => {
			if (json.success) {
				eventBus.trigger(AppEvents.Elements.Toast.Show, `Logged in as ${json.user}`, 'success');
				eventBus.trigger(AppEvents.State.Authenticated, json.user);
				riot.route('home');
				// TODO Save token
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
		
		return promise;
	},
	
	logout() {
		// TODO: implementation: with JWT, delete the token locally
		eventBus.trigger(AppEvents.State.Unauthenticated);
		eventBus.trigger(AppEvents.Elements.Toast.Show, 'Logged out', 'success');
	},
	
	signup(username, password /* , passwordRepeat*/) {
		eventBus.trigger(AppEvents.State.Loading);

		const promise = fetch(Api.Users, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password })
		})
		.then((res) => res.json())
		.then((json) => {
			if (json.success) {
				eventBus.trigger(
					AppEvents.Elements.Toast.Show,
					`User ${json.user} created and logged in`,
					'success');
				eventBus.trigger(AppEvents.State.Authenticated, json.user);
				riot.route('home');
				// TODO Save token
			} else {
				eventBus.trigger(AppEvents.Elements.Toast.Show, `Signup failed: ${json.reason}`, 'error');
			}
		})
		.catch((reason) => {
			eventBus.trigger(AppEvents.Elements.Toast.Show, `Signup failed: ${reason}`, 'error');
		})
		.then(() => {
			eventBus.trigger(AppEvents.State.Loaded);
		});
		
		return promise;
	}
};

export default UserService;
