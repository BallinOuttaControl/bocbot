var _ = require('underscore');

module.exports = function(robot){

	robot.welcome = {

		welcomeMessage: "*Hello {{user}}!*\n" +
						"Welcome to BOC's Slack!  I'm *bocbot*.  Pleased to make your acquaintance!\n" +
						"We have lots of channels so come on in and make yourself at home.  " +
						"If you have any questions about me or what I can do, you can type `bocbot help` or just DM me `help`.",

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

	robot.enter(function(res){
		robot.welcome.roomEntrance(res.message.user, res.message.room);
	});

	robot.respond(/set known users/i, function(res){
		robot.welcome.setKnownUsers();
	});
}
