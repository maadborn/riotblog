import riot from 'riot';

function eventBusFactory() {
	const bus = riot.observable({});
	
	bus.on('*', (event) => {
		console.log('EventBus on:', event, bus.uniq);
		return;
	});
	
	bus.uniq = Math.ceil(Math.random() * 100);
	
	return {
		create() { return bus; }
	};
}

// We want a singleton instance so there is only one eventbus in our app
if (!window._eventBusFactory) {
	window._eventBusFactory = eventBusFactory();
}

export default window._eventBusFactory.create();
