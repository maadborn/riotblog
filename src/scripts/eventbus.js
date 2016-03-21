import riot from 'riot';

const EventBus = riot.observable({});

EventBus.on('*', (event) => { 
	console.log('EventBus on:', event);
	return;
});

export default EventBus;
