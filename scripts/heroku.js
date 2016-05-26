var HerokuClient = require('heroku-client'),
	heroku = new HerokuClient({ token: process.env.HEROKU_API_KEY }),
	pipelineID = process.env.HEROKU_PIPELINE_ID,
	sourceAppID = process.env.HEROKU_STAGING_APP_ID,
	prodAppID = process.env.HEROKU_PRODUCTION_APP_ID;

module.exports = function(robot){

	robot.respond(/list heroku apps/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			heroku.apps().list(function(err, apps){
				if (!!err){
					res.reply('ERROR: ' + err);
					robot.errors.log(err);
					return;
				}

				res.send(robot.util.prettifyJson(apps));
			});
		}
	});

	robot.respond(/get heroku info for (.*)/i, function(res){
		if (robot.auth.isAdmin(res.message.user)){
			var application = heroku.apps(res.match[1]);
			application.info(function(err, app){
				if (!err)
					res.send(robot.util.prettifyJson(app));
				else{
					res.reply('ERROR: ' + err);
					robot.errors.log(err);
				}
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
				if(!!err){
					res.reply('ERROR: ' + err);
					robot.errors.log(err);
				}
				else
					res.reply('Promotion initiated');
			});
		}
		else
			res.reply('Sorry, only admins can do that');
	});
}