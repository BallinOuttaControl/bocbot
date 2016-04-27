var Heroku = require('heroku-client'),
	heroku = new Heroku({ token: process.env.HEROKU_API_KEY }),
	pipelineID = process.env.HEROKU_PIPELINE_ID,
	sourceAppID = process.env.HEROKU_STAGING_APP_ID,
	prodAppID = process.env.HEROKU_PRODUCTION_APP_ID;

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
				if (!err)
					res.send(robot.util.formatJson(app));
				else
					res.reply('There was an error processing your request');
			});
		}
	});

	robot.respond(/promote (the )*stag(e|ing) to prod(uction)*/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			heroku.post('/pipeline-promotions', {
				pipeline: {
					id: pipelineID
				},
				source: {
					app: {
						id: sourceAppID
					}
				},
				targets: [
					{
						app: {
							id: prodAppID
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