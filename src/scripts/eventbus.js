import riot from 'riot';

const EventBus = riot.observable({});

EventBus.on('*', (x) => console.log('EventBus on:', x));

export default EventBus;
