var _ = require('underscore');

module.exports = function(robot){

	_.extend(robot.brain, {
		
		getObject: function(key){
			var dataJson = robot.brain.get(key);
			return JSON.parse(dataJson);
		},

		setObject: function(key, data){
			var dataJson = JSON.stringify(data);
			robot.brain.set(key, dataJson);
		}
	});
}