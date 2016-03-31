import dataService 	from '../../scripts/services/dataservice';
import eventBus 	from '../../scripts/eventbus';
import AppEvents 	from '../../scripts/appevents';
import riot			from 'riot';

function buildPostObject() {
	return {
		title: this.postTitle.value,
		body: this.tags.editor.text,
	};
}

const EditTag = {
	init() {
		this.headerText = (this.opts.isNew ? 'New post' : 'Edit post');
	},
	send() {
		const post = buildPostObject();
		dataService.submitPost(post)
			.then((success) => {
				if (success) {
					eventBus.trigger(AppEvents.Elements.Toast.Show, 'Post added successfully', 'success');
					riot.route('home');
				}
			});
		return false;
	},
};



// class EditTag {
// 	constructor() {
// 		console.log('asdf');
// 	}
	
// 	get headerText() { return this.opts.isNew ? 'New post' : 'Edit post'; }
	
// 	send() {
// 		const post = buildPostObject();
// 		dataService.submitPost(post)
// 			.then((success) => {
// 				if (success) {
// 					eventBus.trigger(AppEvents.Elements.Toast.Show, 'Post added successfully', 'success');
// 					riot.route('home');
// 				}
// 			});
// 		return false;
// 	}
// }

export default EditTag;

// function EditTag() {
// 	const tag = this;
	
// 	function buildPostObject() {
// 		return {
// 			title: tag.postTitle.value,
// 			body: tag.tags.editor.text,
// 		};
// 	}
	
// 	const headerText = (tag.opts.isNew ? 'New post' : 'Edit post');
	
// 	const send = (event) => {
// 		const post = buildPostObject();
// 		dataService.submitPost(post)
// 			.then((success) => {
// 				if (success) {
// 					eventBus.trigger(AppEvents.Elements.Toast.Show, 'Post added successfully', 'success');
// 					riot.route('home');
// 				}
// 			});
// 		event.preventDefault();
// 		return false;
// 	};
	
// 	return {
// 		headerText,
// 		send
// 	};
// }

// export default new EditTag();
