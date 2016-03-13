import riot		from 'riot';
import tempdata	from './tempdata';
import eventBus from './eventBus';

const DataService = {
	get posts() {
		const posts = riot.observable([]);

		setTimeout(() => {
			posts.push(...tempdata.posts);
			eventBus.trigger('data:posts:fetched');
		}, 0);

		return posts;
	}
};

// Export as singleton
export default Object.create(DataService);
