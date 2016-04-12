var path = require('path');

var API_PREFIX = 'api';

function prefixApi(api) {
	var prefixedApi = api;
	
	for (var key in object) {
		if (object.hasOwnProperty(key)) {
			var element = object[key];
			var prefixedElement = path.join(API_PREFIX, element);
			prefixedApi[key] = prefixedElement;
		}
	}
	
	return prefixedApi;
}

var api = {
	posts: 'posts'
};

var prefixedApi = prefixApi(api);

module.exports = prefixedApi;
