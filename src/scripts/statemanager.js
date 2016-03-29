import eventBus from './eventbus';
import AppEvents from './appevents';

/**
 * Application state manager
 * Necessary?
 * How to integrate with the Router and the EventBus?
 */

// multiples of 2, so it can be masked
export const State = {
	Unauthenticated: 0,
	Authenticated: 1
	// add Loading?
};

const stateStorageKey = 'riot_blog_statedata';

const StateDataContainer = {
	state: State.Unauthenticated,
	user: null,
	// add more, e.g. jwt token, post text from unfinished edit, etc.
};

const StateManager = {
	_eventBus: eventBus,
	stateData: StateDataContainer,
	
	set state(value) {
		this.stateData.state = value;
	},
	get state() {
		return this.stateData.state;
	},
	
	hasState(state) {
		return !!(this.state & state);
	},
	
	saveStateData() {
		if (localStorage && localStorage.setItem && this.stateData) {
			localStorage.setItem(stateStorageKey, this.stateData);
		}
	},
	loadStateData() {
		if (localStorage && localStorage.getItem) {
			const data = localStorage.getItem(stateStorageKey);
			if (data) {
				this.stateData = data;
				// TODO: Trigger events to get the app tags up to date
			}
		}
	},
	
	// Add testing ffs!
	addState(state) {
		this.state = this.state | state;
	},
	removeState(state) {
		// Idea: First mask out the state to remove from the stored state,
		// to avoid "removing" a state which isn't stored == adding it.
		// Then XOR the masked state with the stored state to only try to remove that state.
		this.state = (this.state & state) ^ this.state;
	},
	
	addStateData(key, data) {
		if (this.stateData[key] === undefined) {
			throw new Error(
				`StateManager.addState: key ${key} does not exist. Define it in StateDataContainer first`);
		}
		if (data === undefined) {
			throw new Error(
				`StateManager.addState: data to set was undefined.
				Might or might not be a good idea to disallow..`);
		}
		this.stateData[key] = data;
		return;
	},
	
	init() {
		const self = this;

		this._eventBus.on(AppEvents.State.Authenticated, (user) => {
			self.addState(State.Authenticated);
			self.addStateData('user', user);
		});
		this._eventBus.on(AppEvents.State.Unauthenticated, () => {
			self.removeState(State.Authenticated);
			self.addStateData('user', null);
		});
		
		return this;
	},
};

// const StateManager = Object.create(Object.assign({}, StateContainer.init()));

export default StateManager.init();
