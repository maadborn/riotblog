import riot			from 'riot';
import tempdata		from './tempdata';
import eventBus 	from '../eventbus';
import AppEvents 	from '../appevents';

const DataService = {
	get posts() {
		const posts = riot.observable([]);
		
		setTimeout(() => {
			posts.push(...tempdata.posts);
			eventBus.trigger(AppEvents.Data.Posts.Updated);
		}, 0);

		return posts;
	}
};
						
export default DataService;
