import AppEvents from '../../scripts/appevents';
import eventBus from '../../scripts/eventbus';

const KeyMethods = {
	hasKey(key) {
		return Object.keys(this)
			.map((keyName) => keyName.toLowerCase())
			.some((item) => item === key);
	},
	hasCaselessKey(testKey) {
		return Object.keys(this)
			.some((key) => key.toLowerCase() === testKey.toLowerCase());
	},
	getCaselessValueFromKey(key) {
		if (!key) { return null; }
		const capitalCasedKey = key[0].toUpperCase() + key.substring(1);
		return this[capitalCasedKey];
	},
};

const _ToastType = {
	Success: 'success',
	Warning: 'warning',
	Error: 'error',
	Info: 'info',
};

const _ToastIcon = {
	Success: '✓',
	Warning: '!',
	Error: '⚠',
	Info: 'i',
};

const ToastType = Object.assign({}, _ToastType, KeyMethods);
const ToastIcon = Object.assign({}, _ToastIcon, KeyMethods);

const BlogToastTag = {
	init() {
		// Default values
		this.defaultMessage = '[No message]';
		this.defaultType = ToastType.Info;
		this.defaultIconType = ToastIcon.Info;
		this.defaultTimeout = 8000;
		this.defaultMaxLength = 200;
		this.maxWords = 25;
			
		// Properties
		this.message = this.defaultMessage;
		this.type = this.defaultType;
		this.icon = '✓';
		this.timeoutToken = null;

		eventBus.on(AppEvents.Elements.Toast.Show, this.onShowToast.bind(this));
	},
	
	onShowToast(message, type) {
		this.message = this.truncate(message || this.defaultMessage);
		this.type = this.parseType(type);
		this.icon = this.parseIconType(type);
		
		this.root.className = '';
		this.root.classList.add(type);
		
		this.update();
		
		this.showToast();
	},

	showToast() {
		this.root.classList.add('show');
		
		if (this.timeoutToken) {
			clearTimeout(this.timeoutToken);
		}
		
		if (this.type === ToastType.Warning
			|| this.type === ToastType.Error) {
			return;
		}
		
		this.timeoutToken = setTimeout(() => {
			this.hideToast();
			this.timeoutToken = null;
		}, this.getTimeout(this.message));
	},

	hideToast() {
		this.root.classList.remove('show');
	},

	truncate(text) {
		const words = text.split(' ');
		if (words.length > this.maxWords) {
			const truncatedText = words
				.slice(0, this.maxWords)
				.join(' ');
			return `${truncatedText}...`;
		}
		return text;
	},

	parseType(type) {
		if (!ToastType.hasKey(type)) {
			console.warn('blog-toast: type not valid', type);
			return ToastType.Info;
		}
		return type;
	},
	
	parseIconType(type) {
		if (!ToastIcon.hasCaselessKey(type)) {
			console.warn('blog-toast: icon type not valid', type);
			return ToastIcon.Info;
		}
		return ToastIcon.getCaselessValueFromKey(type);
	},

	getTimeout(text) {
		const wordsCount = text.split(' ').length;
		
		return (wordsCount / this.maxWords) * this.defaultTimeout + 1000;
	},
};

export default BlogToastTag;
