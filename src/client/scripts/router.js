import riot			from 'riot';
import dataService 	from './services/dataservice';

export default {
	contentSelector: null,

	init(contentSelector) {
		this.contentSelector = contentSelector;

		riot.route('/', () => {
			riot.route('/home');
		});

		riot.route('/home', () => {
			riot.mount(this.contentMountPoint, 'blog-posts', {
				posts: dataService.getPosts()
			});
		});

		riot.route('/about', () => {
			riot.mount(this.contentMountPoint, 'blog-about');
		});
		
		riot.route('/new-post', () => {
			riot.mount(this.contentMountPoint, 'blog-edit', { isNew: true });
		});
		
		riot.route('/test', () => {
			riot.mount(this.contentMountPoint, 'blog-test');
		});

		riot.route.start(true);
	},

	get contentMountPoint() {
		return document.getElementById(this.contentSelector);
	}
};
