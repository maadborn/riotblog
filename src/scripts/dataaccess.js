import tempdata	from './tempdata';
import riot		from 'riot';

const dataAccess = {
	get posts() {
		let posts = riot.observable([]);

		setTimeout(() => {
			posts.push(...tempdata.posts);
			posts.trigger('fetched');
		}, 0);

		return posts;
	}
};

// Export as singleton
export default Object.create(dataAccess);