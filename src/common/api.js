const path = require('path');

function prefixApi(api) {
	var API_PREFIX = '/api';
	var prefixedApi = {};
	
	for (var key in api) {
		if (api.hasOwnProperty(key)) {
			var element = api[key];
			var prefixedElement = path
				.join(API_PREFIX, element)
				.replace(/\\/g, '/');	// fix: windows turns / to \\
			prefixedApi[key] = prefixedElement;
		}
	}
	
	return prefixedApi;
}

const api = {
	Posts: 'posts',
	Login: 'login',
	Logout: 'logout',
};

const prefixedApi = prefixApi(api);

module.exports = prefixedApi;
