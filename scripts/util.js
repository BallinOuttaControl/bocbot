// Commands:
//   bocbot [new|create|generate|make][ me ][ a ] guid - get a new guid

var _ = require('underscore'),
	crypto = require('crypto');

module.exports = function(robot){

	robot.util = {

		params: {
			jsonSpace: '\t',
			tokenSizeBytes: 64
		},

		generateToken: (callback) => {
			crypto.randomBytes(robot.util.params.tokenSizeBytes, callback);
		},

		formatJson: function(obj, pretty){
			var jsonStr = JSON.stringify(obj, null, this.params.jsonSpace);
			if (!pretty)
				return jsonStr;
			else
				return jsonStr.replace(/"/g, '');
		},

		prettifyJson: function(obj){
			return this.formatJson(obj, true);
		},

		getUser: function(userName){
			if (userName[0] === '@')
				userName = userName.substring(1);
			return robot.brain.userForName(userName);
		},

		toQueryString: function(obj){
			var ret = [];
			_.each(obj, function(value, key){
				ret.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
			});
			return `?${ret.join('&')}`;
		},

		capitalize: function(str){
			if (str.length > 1)
				return str[0].toUpperCase() + str.substring(1);
			return str;
		},

		random: function(o){

			// If 'o' is array, return a random index
			if (_.isArray(o)){
				var index = Math.floor(Math.random() * o.length);
				return o[index];
			}

			// If 'o' is a number, return a random number less than input number
			if (_.isNumber(o))
				return Math.floor(Math.random() * o);
		},

		generateGuid: function(){

			// Get date to use as seed for random number generator
			var date = new Date().getTime();

			// Create a Version 4 UUID (GUID)
			//   Version 4 UUIDs use a scheme relying only on random numbers.
			//   This algorithm sets the version number (4 bits) as well as two reserved bits.
			//   All other bits (the remaining 122 bits) are set using a random or pseudorandom data source.
			//   Version 4 UUIDs have the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx where x is any
			//   hexadecimal digit and y is one of 8, 9, a, or b (e.g., f47ac10b-58cc-4372-a567-0e02b2c3d479).
			var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(char) {
				var random = (date + Math.random() * 16) % 16 | 0;
				date = Math.floor(date / 16);
				return (char == 'x' ? random : (random & 0x3 | 0x8)).toString(16);
			});

			return guid;
		}
	};

	robot.respond(/(new|(create|generate|make)(( me)? a)?) guid/i, function(res){
		res.send(`\`${robot.util.generateGuid()}\``);
	});
}
