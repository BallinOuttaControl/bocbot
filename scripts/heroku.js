var Heroku = require('heroku-client'),
	heroku = new Heroku({ token: process.env.HEROKU_API_KEY });

module.exports = function(robot){

	robot.respond(/list heroku apps/i, function(res){
		heroku.apps().list(function(err, apps){
			res.send(JSON.stringify(apps, null, '\t'));
		});
	});

	robot.respond(/promote staging to production/i, function(res){
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
	});

}