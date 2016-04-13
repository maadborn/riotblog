var path = require('path');

function prefixApi(api) {
	var API_PREFIX = '/api';
	var prefixedApi = {};
	
	for (var key in api) {
		if (api.hasOwnProperty(key)) {
			var element = api[key];
			var prefixedElement = path
				.join(API_PREFIX, element)
				.replace(/\\/g, '/');
			prefixedApi[key] = prefixedElement;
		}
	}
	
	return prefixedApi;
}

var api = {
	Posts: 'posts'
};

var prefixedApi = prefixApi(api);

module.exports = prefixedApi;
