import eventBus from '../eventbus';
import AppEvents from '../appevents';

const UserService = {
	login(username, pw) {
		eventBus.trigger(AppEvents.State.Loading);
		
		// TODO: implementation
		console.log('logging in', username, pw);
		const p = new Promise((resolve /* , reject*/) => {
			setTimeout(() => {
				// reject('no no!');
				resolve({
					user: username,
					token: 'asdf'
				});
			}, 1000);
		});
		
		p.then((response) => {
			eventBus.trigger(AppEvents.Elements.Toast.Show, `Logged in as ${response.user}`, 'success');
			eventBus.trigger(AppEvents.State.Authenticated, response.user);
		}).catch((reason) => {
			eventBus.trigger(AppEvents.Elements.Toast.Show, `Login failed: ${reason}`, 'error');
		}).then(() => {
			eventBus.trigger(AppEvents.State.Loaded);
		});
		
		return p;
	},
	logout() {
		// TODO: implementation
		console.log('logging out');
		eventBus.trigger(AppEvents.State.Unauthenticated);
	}
};

export default UserService;
