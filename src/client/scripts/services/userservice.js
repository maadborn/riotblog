import eventBus 	from '../eventbus';
import AppEvents 	from '../appevents';
import Api 			from '../../../common/api';
import riot			from 'riot';

const UserService = {
	login(username, password) {
		eventBus.trigger(AppEvents.State.Loading);
		
		return fetch(Api.UsersLogin, {
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
				const data = json.data;
				eventBus.trigger(AppEvents.Elements.Toast.Show, `Logged in as ${data.username}`, 'success');
				eventBus.trigger(AppEvents.State.Authenticated, data.username);
				riot.route('home');
				// TODO Save token
			} else {
				throw new Error(`${json.message}`);
			}
		})
		.catch((err) => {
			eventBus.trigger(AppEvents.Elements.Toast.Show, err.message, 'error');
		})
		.then(() => {
			eventBus.trigger(AppEvents.State.Loaded);
		});
	},
	
	logout() {
		// TODO: implementation: with JWT, delete the token locally
		eventBus.trigger(AppEvents.State.Unauthenticated);
		eventBus.trigger(AppEvents.Elements.Toast.Show, 'Logged out', 'success');
	},
	
	signup(username, password) {
		eventBus.trigger(AppEvents.State.Loading);

		return fetch(Api.Users, {
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
				const data = json.data;
				eventBus.trigger(
					AppEvents.Elements.Toast.Show,
					`User ${data.username} created and logged in`,
					'success');
				eventBus.trigger(AppEvents.State.Authenticated, data.username);
				riot.route('home');
				// TODO Save token
			} else {
				throw new Error(`${json.message}`);
			}
		})
		.catch((err) => {
			eventBus.trigger(AppEvents.Elements.Toast.Show, err.message, 'error');
		})
		.then(() => {
			eventBus.trigger(AppEvents.State.Loaded);
		});
	},
};

export default UserService;
