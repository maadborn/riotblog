import riot			from 'riot';
import tempdata		from './tempdata';
import eventBus 	from '../eventbus';
import AppEvents 	from '../appevents';

const DataServiceValidator = {
	validatePost(post) {
		return post.title
			&& post.body;
	}
};

const DataService = {
	posts: riot.observable([]),
	
	getPosts() {
		setTimeout(() => {
			this.posts.push(...tempdata.posts);
			eventBus.trigger(AppEvents.Data.Posts.Updated);
		}, 0);

		return this.posts;
	},
	
	submitPost(post) {
		const prom = new Promise((resolve, reject) => {
			eventBus.trigger(AppEvents.State.Loading);
			
			if (!DataServiceValidator.validatePost(post)) {
				reject('The post is missing required parts');
			}
			
			setTimeout(() => {
				const p2 = Object.assign(post, { time: Date.now() });
				resolve(p2);
			}, 300);
		});
		
		prom.then((responsePost) => {
			this.posts.unshift(responsePost);
			eventBus.trigger(AppEvents.Data.Posts.Updated);
			return true;
		}).catch((message) => {
			eventBus.trigger(AppEvents.Elements.Toast.Show, message, 'error');
			return false;
		}).then((success) => {
			eventBus.trigger(AppEvents.State.Loaded);
			return success;
		});
		
		return prom;
	}
};

export default DataService;
