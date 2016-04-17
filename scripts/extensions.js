module.exports = function(robot){

	robot.util = {
		formatJson: function(obj, space){
			if (!!space)
				space = '\t';
			return JSON.stringify(obj, null, space);
		},
		getUser: function(userName){
			if (userName[0] === '@')
				userName = userName.substring(1);
			return robot.brain.userForName(userName);
		}
	};

}