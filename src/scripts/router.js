import riot			from 'riot';
import dataService 	from './dataservice';

export default {
	contentSelector: null,

	init(contentSelector) {
		this.contentSelector = contentSelector;

		riot.route('/', () => {
			riot.route('/home');
		});

		riot.route('/home', () => {
			riot.mount(this.contentMountPoint, 'posts', {
				posts: dataService.posts
			});
		});

		riot.route('/about', () => {
			riot.mount(this.contentMountPoint, 'about');
		});

		riot.route.start(true);
	},

	get contentMountPoint() {
		return document.getElementById(this.contentSelector);
	}
};
