import eventBus from '../eventbus';

const UserService = {
	login(user, pw) {
		console.log('logging in', user, pw);

		eventBus.trigger('data:global:loading');
		
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
			eventBus.trigger('data:global:loaded');
		});
		
		return p;
	},
	logout() {
		console.log('logging out');
	}
};

export default UserService;
