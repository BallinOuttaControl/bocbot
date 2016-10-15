var _ = require('underscore');

var urlSafeBase64 = Object.create(Object.prototype, {

	encode: {
		value: (buffer) => {
			if (_.isString(buffer))
				buffer = new Buffer(buffer, 'utf8');

			return buffer.toString('base64')
				.replace(/\+/g, '-') // Convert '+' to '-'
				.replace(/\//g, '_') // Convert '/' to '_'
				.replace(/=+$/, ''); // Remove ending '='
		}
	},

	decode: {
		value: (base64) => {
			// Add removed at end '='
			base64 += Array(5 - base64.length % 4).join('=');
			base64 = base64
				.replace(/-/g, '+') // Convert '-' to '+'
				.replace(/_/g, '/'); // Convert '_' to '/'

			return new Buffer(base64, 'base64');
		}
	},

	validate: {
		value: (base64) => {
			return /^[A-Za-z0-9\-_]+$/.test(base64);
		}
	}
});

module.exports = urlSafeBase64;
