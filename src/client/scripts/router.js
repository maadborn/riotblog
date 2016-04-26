import riot			from 'riot';
import dataService 	from './services/dataservice';

const Router = {
	contentSelector: null,

	init(contentSelector) {
		this.contentSelector = contentSelector;

		riot.route('/', () => {
			riot.route('/home');
		});

		riot.route('/home', () => {
			this.setMainContentTo('blog-posts', {
				posts: dataService.getPosts()
			});
		});

		riot.route('/about', () => {
			this.setMainContentTo('blog-about');
		});
		
		riot.route('/new-post', () => {
			this.setMainContentTo('blog-edit', { isNew: true });
		});
		
		riot.route('/test', () => {
			this.setMainContentTo('blog-test');
		});
		
		riot.route('/login', () => {
			this.setMainContentTo('blog-login');
		});

		riot.route.start(true);
	},

	get contentMountPoint() {
		return document.getElementById(this.contentSelector);
	},
	
	setMainContentTo(tag, options) {
		function empty(node) {
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}
		}
		
		const elem = document.createElement(tag);
		
		empty(this.contentMountPoint);
		this.contentMountPoint.appendChild(elem);
		
		riot.mount(elem, tag, options);
	},
};

export default Router;
