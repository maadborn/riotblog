
const AppEvents = {
	Elements: {
		LoginBox: {
			Toggle: 'elem:loginbox:toggle'
		}
	},
	State: {
		Loading: 'state:loading',
		Loaded: 'state:loaded',
		Unauthenticated: 'state:authenticated',
		Authenticated: 'state:unauthenticated'
	},
	Data: {
		Posts: {
			Updated: 'data:posts:updated'
		}
	}
};

export default AppEvents;
