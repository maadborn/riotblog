import riot			from 'riot';
import dataAccess 	from './dataaccess';

export default {
	contentSelector: null,

	init(contentSelector) {
		console.log('init router');

		this.contentSelector = contentSelector;

		riot.route('/', () => {
			riot.route('/home');
		});

		riot.route('/home', () => {
			riot.mount(this.contentMountPoint, 'posts', { 
				posts: dataAccess.posts
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
}