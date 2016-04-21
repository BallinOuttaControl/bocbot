module.exports = function(robot){

	robot.slack = {

		baseApiUrl: 'https://slack.com/api/',

		createApiUrl: function (suffix){
			return robot.slack.baseApiUrl + suffix;
		}
	};

	robot.respond(/current slack token/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			res.reply(process.env.HUBOT_SLACK_TOKEN);
		}
	});

	robot.respond(/channel list please/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var data = {
				token: process.env.HUBOT_SLACK_TOKEN,
				exclude_archived: 1
			};

			robot.http(robot.slack.createApiUrl('channels.list' + robot.util.toQueryString(data)))
			.get()(function(err, response, body){
				if (!!err){
					res.reply('There was an error processing your request');
					return;
				}
				var bodyJson = JSON.parse(body);
				res.send(robot.util.formatJson(bodyJson));
			});
		}
	});
}