var _ = require('underscore');

module.exports = function(robot){

	robot.welcome = {

		welcomeMessage: "*Hello {{user}}!*\nWelcome to BOC's Slack!  I'm *bocbot*.  Pleased to make your acquaintance!\nYou can type `bocbot help` to learn what I can do.",

		// Sets all the users that bocbot currently knows about as 'KnownUsers'
		setKnownUsers: function(){
			var users = _.map(robot.brain.users(), function(user){
				return user.id;
			});
			robot.brain.setObject('KnownUsers', users);
		},

		// Gets all of bocbot's 'KnownUsers'
		getKnownUsers: function(){
			return robot.brain.getObject('KnownUsers');
		},

		// Checks to see if a user is new
		isNewUser: function(user){
			var users = robot.brain.getObject('KnownUsers');
			if (!_.contains(users, user.id))
				return true;
			else
				return false;
		},

		// Handles a user entering a room
		roomEntrance: function(user, room){
			var isNewUser = this.isNewUser(user);
			if (isNewUser){
				var message = this.welcomeMessage.replace(/{{user}}/g, robot.util.capitalize(user.name));
				robot.messageRoom(room, message);
				robot.welcome.setKnownUsers();
			}
		}
	};

	robot.respond(/remove connor/i, function(res){
		var users = robot.brain.getObject('KnownUsers');
		res.send(robot.util.prettifyJson(users));
		var index = users.indexOf('U10HENG04');
		users.splice(index, 1);
		robot.brain.setObject('KnownUsers', users);
		res.send(robot.util.prettifyJson(robot.brain.getObject('KnownUsers')));
	});

	robot.enter(function(res){
		robot.welcome.roomEntrance(res.message.user, res.message.room);
	});

	// robot.respond(/testwelcome/i, function(res){
	// 	var jsonStr = robot.util.prettifyJson(res.message.room);
	// 	res.send(jsonStr);
	// 	if (robot.welcome.isNewUser(res.message.user))
	// 		res.send(res.message.user.name + ' IS a new user');
	// 	else
	// 		res.send(res.message.user.name + ' IS NOT a new user');
	// });

	// robot.respond(/set known users/i, function(res){
	// 	robot.welcome.setKnownUsers();
	// });

	// robot.respond(/get known users/i, function(res){
	// 	res.send(robot.util.prettifyJson(robot.welcome.getKnownUsers()));
	// });
}
