'use strict';

function SimpleDTO(data = {}, success = true, message = null) {
	return {
		data,
		success,
		message,
	};
}

// TODO add methods like success, failure
// TODO add another property that can handle different kinds of failures, like error, validation

module.exports = SimpleDTO;
