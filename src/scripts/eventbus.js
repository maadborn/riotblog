import riot from 'riot';

/*
const EventBus = riot.observable({});

EventBus.on('*', (event) => { 
	console.log('EventBus on:', event);
	return;
});

export default EventBus;
*/

function EventBusFactory() {
	const bus = riot.observable({});
	
	bus.on('*', (event) => { 
		console.log('EventBus on:', event, bus.uniq);
		return;
	});
	
	bus.uniq = Math.ceil(Math.random() * 100);
	
	return {
		create() { return bus; }
	}
}

if (!window._EventBusFactory) {
	window._EventBusFactory = EventBusFactory();
} 

export default window._EventBusFactory.create();
