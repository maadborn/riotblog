import dataService 	from '../../scripts/services/dataservice';
import eventBus 	from '../../scripts/eventbus';
import AppEvents 	from '../../scripts/appevents';
import riot			from 'riot';

const EditTag = {
	init() {
		this.headerText = (this.opts.isNew ? 'New post' : 'Edit post');
	},
	send(event) {
		const post = this.buildPostObject();
		dataService.submitPost(post)
			.then((success) => {
				if (success) {
					eventBus.trigger(AppEvents.Elements.Toast.Show, 'Post added successfully', 'success');
					riot.route('home');
				}
			});
		event.preventDefault();
		return false;
	},
};

const EditTagHelpers = {
	buildPostObject() {
		return {
			title: this.postTitle.value,
			body: this.tags.editor.text,
		};
	}
};

export default Object.assign(EditTag, EditTagHelpers);
