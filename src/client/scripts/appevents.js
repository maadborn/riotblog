
const AppEvents = {
	Elements: {
		LoginBox: {
			Toggle: 'elem:loginbox:toggle'
		},
		Toast: {
			Show: 'elem:toast:show'
		}
	},
	State: {
		Loading: 'state:loading',
		Loaded: 'state:loaded',
		Authenticated: 'state:authenticated',
		Unauthenticated: 'state:unauthenticated',
	},
	Data: {
		Posts: {
			Updated: 'data:posts:updated'
		}
	}
};

export default AppEvents;
