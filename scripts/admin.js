var _ = require('underscore');

module.exports = function(robot){

	robot.respond(/last beer/i, function(res){
		var response = 'My last beer was from ' + robot.brain.get('lastBeerFrom');
		if (robot.auth.isAdmin(res.message.user))
			res.reply(response + '.  I\'ve had ' + robot.brain.get('totalBeersHad'));
		else
			res.reply(response);
	});

	robot.respond(/(tell me|what is|what(.*)s) my userid/i, function(res){
		if (robot.auth.isAdmin(res.message.user))
			res.reply('Your user ID is ' + res.message.user.id);
	});

	robot.respond(/(tell me|what is|what(.*)s) (.*)'s userid/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			// var user = robot.util.getUser(res.match[2]);
			// if (!!user)
			// 	res.reply('No user by that name');
			// else
			// 	res.reply(_.result(user, 'id'));
			var str = '';
			_.each(match, function(m){
				str += m + ' | ';
				res.send(str);
			});
		}
	});

	robot.respond(/(give me|send me) my user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			res.send(robot.util.formatJson(res.message.user));
		}
	});

	robot.respond(/(give me|send me) (.*)'s user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var user = robot.util.getUser(res.match[1]);
			if (!!user)
				res.send('No user by that name');
			else
				res.send(robot.util.formatJson(user));
		}
	});
}