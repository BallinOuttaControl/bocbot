var _ = require('underscore');

module.exports = function(robot){

	robot.respond(/last beer/i, function(res){
		var response = 'My last eber was from ' + robot.brain.get('lastBeerFrom');
		if (robot.auth.isAdmin(res.message.user))
			res.reply(response + '.  I\'ve had ' + robot.brain.get('totalBeersHad'));
		else
			res.reply(response);
	});

	robot.respond(/userid/i, function(res){
		if (robot.auth.isAdmin(res.message.user))
			res.reply('Your user ID is ' + res.message.user.id);
	});

	robot.respond(/userid (.*)/i, function(res){
		robot.auth.isAdmin(res.message.user) || return;
		
		var users = {};
		var apiUrl = robot.brain.get('slack-api-url') + 'users.list';
		var userName = res.match[1];
		if (userName[0] === '@')
			userName = userName.substring(1);

		robot.http(apiUrl).get(function(err, response, body){
			res.send(JSON.stringify(body));
		});

		//res.reply(userName + '\'s user ID is ' + );
	});
}