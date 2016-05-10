var _ = require('underscore');

module.exports = function(robot){

	robot.util = {

		params: {
			jsonSpace: '\t'
		}

		formatJson: function(obj, pretty){
			var jsonStr = JSON.stringify(obj, null, this.params.jsonSpace);
			if (!pretty)
				return jsonStr;
			else
				return jsonStr.replace(/"/g, '');
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

		random: function(o){

			// If 'o' is array, return a random index
			if (_.isArray(o)){
				var index = Math.floor(Math.random() * o.length);
				return o[index];
			}

			// If 'o' is a number, return a random number less than input number
			if (_.isNumber(o))
				return Math.floor(Math.random() * o)
		}
	};
}