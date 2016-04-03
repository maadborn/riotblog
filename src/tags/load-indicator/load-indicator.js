import AppEvents from '../../scripts/appevents';
import eventBus from '../../scripts/eventbus';

const LoadIndicatorTag = {
	init() {
		eventBus.on(AppEvents.State.Loading, this.loading.bind(this));
		eventBus.on(AppEvents.State.Loaded, this.loaded.bind(this));
	},
		
	loading() {
		this.root.style.display = 'flex';
	},
	
	loaded() {
		this.root.style.display = 'none';
	},
};

export default LoadIndicatorTag;
