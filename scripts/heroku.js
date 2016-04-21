var Heroku = require('heroku-client'),
	heroku = new Heroku({ token: process.env.HEROKU_API_KEY });

module.exports = function(robot){

	robot.respond(/list heroku apps/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			heroku.apps().list(function(err, apps){
				res.send(robot.util.formatJson(apps));
			});
		}
	});

	robot.respond(/get heroku info for (.*)/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var application = heroku.apps(res.match[1]);
			application.info(function(err, app){
				if (!!err)
					res.send(robot.util.formatJson(app));
			});
		}
	});

	robot.respond(/promote staging to production/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			heroku.post('/pipeline-promotions', {
				pipeline: {
					id: process.env.HEROKU_PIPELINE_ID
				},
				source: {
					app: {
						id: process.env.HEROKU_SOURCE_APP_ID
					}
				},
				targets: [
					{
						app: {
							id: process.env.HEROKU_TARGET_APP_ID
						}
					}
				]
			},
			function(err, app){
				if(!!err)
					res.reply('There was an error processing your request');
				else
					res.reply('Promotion initiated');
			});
		}
		else
			res.reply('Sorry, only admins can do that');
	});
}