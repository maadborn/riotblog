import eventBus from './eventbus';
import AppEvents from './appevents';

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

const StateManager = {
	_eventBus: eventBus,
	_state: State.Unauthenticated,
	
	set state(value) {
		this._state = value;
	},
	get state() { 
		return this._state; 
	},
	
	// Add testing ffs!
	addState(state) {
		this._state = this._state | state;	
	},
	removeState(state) {
		// Idea: First mask out the state to remove from the stored state,
		// to avoid "removing" a state which isn't stored == adding it.
		// Then XOR the masked state with the stored state to only try to remove that state.
		this._state = (this._state & state) ^ this._state;	
	},
	
	init() {
		const self = this;

		this._eventBus.on(AppEvents.State.Authenticated, () => { 
			self.addState(State.Authenticated); 
		});
		this._eventBus.on(AppEvents.State.Unauthenticated, () => { 
			self.removeState(State.Authenticated); 
		});
		
		return this;
	},
};

//const StateManager = Object.create(Object.assign({}, StateContainer.init())); // StateContainer));

export default StateManager.init();
