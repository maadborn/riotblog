import App from './app';	// Import default

const app = App; 			// Object.create(App);

window.app = app;

app.init();
