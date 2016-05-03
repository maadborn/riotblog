import riot			from 'riot';
// import tempdata		from './tempdata';
import eventBus 	from '../eventbus';
import AppEvents 	from '../appevents';
import Api 			from '../../../common/api';
import stateMgr		from '../statemanager';

const DataServiceValidator = {
	validatePost(post, username) {
		return post.title
			&& post.body
			&& username;
	}
};

const DataService = {
	posts: riot.observable([]),
	
	getPosts() {
		fetch(Api.Posts)
			.then((res) => res.json())
			.then((json) => {
				this.posts.length = 0;
				this.posts.push(...json);
				eventBus.trigger(AppEvents.Data.Posts.Updated);
			});

		return this.posts;
	},
	
	submitPost(post) {
		eventBus.trigger(AppEvents.State.Loading);
		
		const username = stateMgr.getStateData('user');
		
		if (!DataServiceValidator.validatePost(post, username)) {
			eventBus.trigger(
				AppEvents.Elements.Toast.Show,
				'The post is missing required parts',
				'warning');
			return;
		}
		
		const prom = fetch(Api.Posts, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: post.title,
				body: post.body,
				username
			})
		})
		.then((responsePost) => {
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
