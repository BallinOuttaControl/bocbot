var _ = require('underscore');

module.exports = function(robot){

	robot.welcome = {

		welcomeRoom: 'general',
		welcomeMessage: "*Hello {{user}}!*\n" +
						"Welcome to BOC's Slack!  I'm *bocbot*.  Pleased to make your acquaintance!\n" +
						"We have lots of channels so come on in and make yourself at home.  " +
						"If you have any questions about me or what I can do, you can type `bocbot help` or just DM me `help`.",

		bindEvents: () => {
			_.each(robot.welcome.eventHandlers, (mapping) => {
				robot.adapter.client.on(mapping.event, mapping.handler);
			});
		},

		slackEvents: [
			{
				event: robot.adapter.client.rtm.events.TEAM_JOIN,
				handler: (e) => {

					// I don't think we need to welcome bots
					if (e.user.is_bot) {
						robot.messageRoom('bocbot-logs', `A user named '${e.user.name || 'just kidding I don\'t know the mame'}' joined but is bot... not welcoming them`);
						return;
					}
					else{
						robot.messageRoom('bocbot-logs', `A user named '${e.user.name || 'just kidding I don\'t know the mame'}' joined`);
					}

					var name = e.user.real_name || e.user.name;
					var message = robot.welcome.welcomeMessage.replace(/{{user}}/g, name);
					robot.messageRoom(robot.welcome.welcomeRoom, message);
					console.log(`user joined: ${name}`);
				}
			}
		]
	};

	robot.welcome.bindEvents();
};
