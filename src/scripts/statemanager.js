import eventBus from './eventbus';

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

export const StateManager = {
	_eventBus: eventBus,
	_state: State.Unauthenticated,
	set state(state) {
		debugger;
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

export default StateManager;