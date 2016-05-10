'use strict';

function SimpleDTO(data = {}, success = true, message = null) {
	if (message) {
		// Strip message of the Error's prepended "Error: "
		message = message.replace(/Error: /g, '');
	}
	
	return {
		data,
		success,
		message,
	};
}

// TODO add methods like success, failure
// TODO add another property that can handle different kinds of failures, like error, validation

module.exports = SimpleDTO;
