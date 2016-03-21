import eventBus from '../eventbus';
import AppEvents from '../appevents';

const UserService = {
	login(user, pw) {
		console.log('logging in', user, pw);

		eventBus.trigger(AppEvents.State.Loading);
		
		let p = new Promise((resolve, reject) => {
			setTimeout(() => {
				//reject('no no!');
				resolve(`${user} logged in!`);
			}, 1000);
		});
		
		p.then((response) => {
			console.log(response);
		}).catch((reason) => {
			console.log('login failed:', reason);
		}).then(() => {
			eventBus.trigger(AppEvents.State.Loaded);
		});
		
		return p;
	},
	logout() {
		console.log('logging out');
	}
};

export default UserService;
