import riot		from 'riot';
import tempdata	from './tempdata';
import eventBus from '../eventbus';

const DataService = {
	get posts() {
		const posts = riot.observable([]);
		
		setTimeout(() => {
			posts.push(...tempdata.posts);
			eventBus.trigger('data:posts:updated');
		}, 0);

		return posts;
	}
};

							// Export as singleton
export default DataService; //Object.create(DataService);
