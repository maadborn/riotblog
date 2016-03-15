import riot		from 'riot';
import tempdata	from './tempdata';
import eventBus from './eventbus';

const DataService = {
	get posts() {
		console.log('start posts');
		const posts = riot.observable([]);
		
		setTimeout(() => {
			debugger;
			posts.push(...tempdata.posts);
			console.log('trigger posts updated');
			eventBus.trigger('data:posts:updated');
		}, 0);

		console.log('return posts');
		return posts;
	}
};

// Export as singleton
export default Object.create(DataService);
