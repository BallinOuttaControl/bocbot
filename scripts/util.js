var _ = require('underscore');

module.exports = function(robot){

	robot.util = {

		formatJson: function(obj){
			return JSON.stringify(obj, null, '\t');
		},

		getUser: function(userName){
			if (userName[0] === '@')
				userName = userName.substring(1);
			return robot.brain.userForName(userName);
		},

		toQueryString: function(o){
			var ret = [];
			_.each(o, function(value, key){
				ret.push(key + '=' + value);
			});
			return '?' + ret.join('&');
		}
	};
}