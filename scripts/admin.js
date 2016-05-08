module.exports = function(robot){

	var ventriloquistRole = 'ventriloquist';

	var mensRoom = 'boc-men',
	bocbotRules = [
		'1. A robot may not harm humans or humanity in general, or, by inaction, allow humans or humanity as a whole to come to harm.',
		'2. A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.',
		'3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.'
	],
	mensRoomRules = [
		'1. Thou shalt not speak of anything that happens within this channel to others not invited to this channel.',
		'2. Thou shalt not share opinions, confessions, secrets or any other private content with the enemies.'
	],
	basicRoomRules = [
		'1. Be nice.',
		'2. Keep spam in #random.',
		'3. Don\'t get bocbot drunk.'
	];

	robot.respond(/set redis data/i, function(res){
		robot.brain.setObject('bocbotRules', bocbotRules);
		robot.brain.setObject('mensRoomRules', mensRoomRules);
		robot.brain.setObject('basicRoomRules', basicRoomRules);
		robot.brain.set('mensRoom', 'boc-men');
	});

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
			var user = JSON.parse(robot.util.getUser(res.match[2]));
			if (!user && user !== null)
				res.reply('Sorry, I don\'t know of a user called ' + user);
			else
				res.reply(user.id);
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