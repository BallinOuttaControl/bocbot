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

	robot.respond(/(tell me|what is|what(.*)s) (.*)'s userid/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var user = JSON.parse(robot.util.getUser(res.match[2]));
			if (!!user)
				res.reply('Sorry, I don\'t know of a user called ' + user);
			else
				res.reply(user.id);
		}
	});

	robot.respond(/my user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			res.send(robot.util.formatJson(res.message.user));
		}
	});

	robot.respond(/(.*)'s user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var user = robot.util.getUser(res.match[1]);
			if (!!user)
				res.send('No user by name "' + user + '"');
			else
				res.send(robot.util.formatJson(user));
		}
	});

	robot.respond(/room id/i, function(res){
		res.send(res.envelope.room);
	});

	robot.respond(/message ([\s\S]+) "(.*)"/i, function(res){
		if (robot.auth.hasRole(res.message.user, ventriloquistRole)){
			var room = res.match[1].trim(),
				message = res.match[2].trim();

			try{
				robot.messageRoom(room, message);
				res.reply(robot.name + ' successfully said "' + message + '" in ' + room);
			}
			catch (err){
				res.reply('Invalid room name\n' + robot.util.formatJson(err));
			}
		}
	});
}