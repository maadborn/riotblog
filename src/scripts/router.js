import riot 	from 'riot';
import tempdata	from './tempdata';


export default {
	contentSelector: null,

	init(contentSelector) {
		console.log('init router');

		this.contentSelector = contentSelector;

		riot.route('/', () => {
			riot.route('/home');
		});

		riot.route('/home', () => {
			riot.mount(this.getContentMountPoint(), 'posts', { 
				posts: this.loadPosts()
			});
		});

		riot.route('/about', () => {
			riot.mount(this.getContentMountPoint(), 'about');
		});

		riot.route.start(true);
	},

	getContentMountPoint() {
		return document.getElementById(this.contentSelector);
	},

	loadPosts() {
		return tempdata.posts;
	}
}