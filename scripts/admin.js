var _ = require('underscore');

module.exports = function(robot){

	function getUser(userName){
		if (userName[0] === '@')
			userName = userName.substring(1);
		return robot.brain.userForName(userName);
	}

	function formatJson(obj, space){
		if (!!space)
			space = '\t';
		return JSON.stringify(obj, null, space);
	}

	robot.respond(/last beer/i, function(res){
		var response = 'My last beer was from ' + robot.brain.get('lastBeerFrom');
		if (robot.auth.isAdmin(res.message.user))
			res.reply(response + '.  I\'ve had ' + robot.brain.get('totalBeersHad'));
		else
			res.reply(response);
	});

	robot.respond(/tell me my userid/i, function(res){
		if (robot.auth.isAdmin(res.message.user))
			res.reply('Your user ID is ' + res.message.user.id);
	});

	robot.respond(/tell me (.*)'s userid/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var userName = res.match[1];
			var user = getUser(userName);
			return _.result(user, 'id');
		}
	});

	robot.respond(/give me my user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			res.send(formatJson(res.message.user));
		}
	});

	robot.respond(/give me (.*)'s user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var user = getUser(res.match[1]);
			res.send(formatJson(user));
		}
	});
}