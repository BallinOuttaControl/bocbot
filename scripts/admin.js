//var _ = require('underscore');

module.exports = function(robot){

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
			var user = robot.brain.usersForFuzzyName(userName);
			return user[0].slack.id;
		}
	});

	robot.respond(/give me my user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			res.send(JSON.stringify(res.message.user, null, '\t'));
		}
	});

	robot.respond(/give me (.*)'s user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var apiUrl = robot.brain.get('slack-api-url') + 'users.list';
			var userName = res.match[1];
			if (userName[0] === '@')
				userName = userName.substring(1);

			var user = robot.brain.usersForFuzzyName(userName);
			res.send(JSON.stringify(user, null, '\t'));

			//res.reply(userName + '\'s user ID is ' + );
		}
	});
}