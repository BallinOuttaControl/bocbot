var _ = require('underscore');

module.exports = function(robot){

	robot.slack = {

		baseApiUrl: 'https://slack.com/api/',

		createApiUrl: function (suffix, queryString){
			if (!!queryString){
				if (_.isObject(queryString))
					queryString = robot.util.toQueryString(queryString);
				return robot.slack.baseApiUrl + suffix + queryString;
			}
			return robot.slack.baseApiUrl + suffix;
		}
	};

	robot.respond(/channel list/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var data = {
				token: process.env.HUBOT_SLACK_TOKEN,
				exclude_archived: 1
			};

			robot.http(robot.slack.createApiUrl('channels.list', data))
			.header('Accept', 'application/json')
			.get()(function(err, response, body){
				if (!!err){
					res.reply('ERROR: ' + err);
					robot.errors.log(err);
					return;
				}
				var bodyJson = JSON.parse(body);
				res.send(robot.util.prettifyJson(bodyJson));
			});
		}
	});
}