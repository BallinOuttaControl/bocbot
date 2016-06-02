var _ = require('underscore');

module.exports = function(robot){

	robot.util = {

		params: {
			jsonSpace: '\t'
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
				ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
			});
			return '?' + ret.join('&');
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
			var date = new Date().getTime();
			var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var random = (date + Math.random() * 16) % 16 | 0;
				date = Math.floor(date / 16);
				return (c == 'x' ? random : (random & 0x3 | 0x8)).toString(16);
			});
			return guid;
		}
	};
}
