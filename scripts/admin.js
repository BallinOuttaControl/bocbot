module.exports = function(robot){

	var ventriloquistRole = 'ventriloquist';

	robot.respond(/last beer/i, function(res){
		var response = 'My last beer was from ' + robot.brain.get('lastBeerFrom');
		if (robot.auth.isAdmin(res.message.user))
			res.reply(response + '.  I\'ve had ' + robot.brain.get('totalBeersHad'));
		else
			res.reply(response);
	});

	robot.respond(/my user( )*id/i, function(res){
		if (robot.auth.isAdmin(res.message.user))
			res.reply('Your user ID is ' + res.message.user.id);
	});

	robot.respond(/(.*)'s user( )*id/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var user = robot.util.getUser(res.match[1]);
			if (!user && user !== null)
				res.reply('Sorry, I don\'t know of a user called ' + user);
			else
				res.reply('Antonio\'s user ID is ' + user.id);
		}
	});

	robot.respond(/my user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			res.send(robot.util.formatJson(res.message.user, true));
		}
	});

	robot.respond(/(.*)'s user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var user = robot.util.getUser(res.match[1]);
			if (!user && user !== null)
				res.send('No user by name "' + user + '"');
			else
				res.send(robot.util.formatJson(user, true));
		}
	});

	robot.respond(/room( )*id/i, function(res){
		res.send(res.envelope.room);
	});

	robot.respond(/message ([\s\S]+) "(.*)"/i, function(res){
		if (robot.auth.isAdmin(res.message.user) || robot.auth.hasRole(res.message.user, ventriloquistRole)){
			var room = res.match[1].trim(),
				message = res.match[2].trim();

			robot.messageRoom(room, message);
			res.reply(robot.name + ' successfully said "' + message + '" in ' + room);
		}
	});
}