import __eventBus from './eventbus';

/**
 * Application state manager
 * Necessary?
 * How to integrate with the Router and the EventBus? 
 */

// multiples of 2, so it can be masked?
export const State = {
	Unauthenticated: 0,
	Authenticated: 1
	// add Loading?
};

// export const StateManager = {
// 	_eventBus: eventBus,
// 	_state: State.Unauthenticated,
// 	set state(state) {
// 		this._state = state;
// 	},
// 	get state() { 
// 		return this._state; 
// 	},
// 	init() {
// 		this._eventBus.on('state:authenticated', () => { this.state = State.Authenticated; });
// 		this._eventBus.on('state:unauthenticated', () => { this.state = State.Unauthenticated; });
// 	}
// };

// export default StateManager;

///// NEW /////

// const StateContainer = {
// 	set state(state) {
// 		this._state = state;
// 	},
// 	get state() { 
// 		return this._state; 
// 	},
// };

// function StateManager(state = State.Unauthenticated, eventBus = __eventBus) {
// 	let _state = state;
// 	const _eventBus = eventBus;
	
// 	_eventBus.on('state:authenticated', () => { _state = State.Authenticated; });
// 	_eventBus.on('state:unauthenticated', () => { _state = State.Unauthenticated; });
	
// 	return this;
// };

// const stateManager = Object.create(Object.assign(StateManager, StateContainer));

/////// NEW 2 ///////

const StateContainer = {
	_state: State.Unauthenticated,
	set state(state) {
		this._state = state;
	},
	get state() { 
		return this._state; 
	},
};

const StateEventer = {
	_eventBus: eventBus,
	set state(state) {
		this._state = state;
	},
	get state() { 
		return this._state; 
	},
	init() {
		this._eventBus.on('state:authenticated', () => { this.state = State.Authenticated; });
		this._eventBus.on('state:unauthenticated', () => { this.state = State.Unauthenticated; });
	}
};

const StateManager = Object.assign({}, StateEventer, StateContainer);

export default StateManager;