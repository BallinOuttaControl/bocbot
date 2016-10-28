// Commands:
//   bocbot [whoami|who am i] - find out who you are

var base64 = require('../lib/base64');

module.exports = function(robot){

	robot.respond(/adminlink/i, (res) => {
		if (!robot.auth.isAdmin(res.message.user))
			return;

		robot.util.generateToken((err, buffer) => {
			var token = base64.encode(buffer);
			var userid = base64.encode(res.message.user.id);
			res.reply(`http://localhost:8080/admin/${userid}/${token}`);
		});
	});

	robot.respond(/last beer/i, function(res){
		var response = 'My last beer was from ' + robot.brain.get('lastBeerFrom');
		if (robot.auth.isAdmin(res.message.user))
			res.reply(response + '.  I\'ve had ' + robot.brain.get('totalBeersHad'));
		else
			res.reply(response);
	});

	robot.respond(/my user( )*id/i, function(res){
		var response = 'Your user ID is ' + res.message.user.id;
		if (robot.auth.isAdmin(res.message.user))
			res.reply(response);
		else{
			robot.messageRoom(res.message.user.name, response);
			res.reply('I direct messaged you the answer');
		}
	});

	robot.respond(/(.*)'s user( )*id/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var user = robot.util.getUser(res.match[1]);
			if (!user && user !== null)
				res.reply('Sorry, I don\'t know of a user called ' + user);
			else
				res.reply('Their user ID is ' + user.id);
		}
	});

	robot.respond(/my user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user))
			res.send(robot.util.prettifyJson(res.message.user));
		else
			robot.messageRoom(res.message.user.name, robot.util.prettifyJson(res.message.user));
	});

	robot.respond(/(.*)'s user object/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var user = robot.util.getUser(res.match[1]);
			if (!user && user !== null)
				res.send('No user by name "' + user + '"');
			else
				res.send(robot.util.prettifyJson(user));
		}
	});

	robot.respond(/room( )*id/i, function(res){
		res.send(res.envelope.room);
	});

	robot.respond(/who[ ]*am[ ]*i/i, function(res){
		res.reply('You\'re ' + res.message.user.slack.profile.first_name + '.  @' + res.message.user.name + '.  ID: ' + res.message.user.id);
	});

	robot.respond(/message ([\s\S]+) "(.*)"/i, function(res){
		if (robot.auth.isAdmin(res.message.user) || robot.auth.hasRole(res.message.user, robot.roles.ventriloquist)){
			var room = res.match[1].trim(),
				message = res.match[2].trim();

				if (room[0] === '@' || room[0] === '#')
					room = room.substring(1);

			try{
				robot.messageRoom(room, message);
				res.reply(robot.name + ' successfully said "' + message + '" in ' + room);
			}
			catch (error){
				robot.errors.log(error);
				res.reply('There was an error saying "' + message + '" in ' + room);
			}
		}
	});
}
