var Heroku = require('heroku-client'),
	heroku = new Heroku({ token: process.env.HEROKU_API_KEY });

module.exports = function(robot){

	robot.respond(/list bocbot-dev info/i, function(res){
		var app = heroku.apps('bocbot-dev');
		app.info(function(err, app){
			res.reply(JSON.stringify(app, null, '\t'));
		});
	});

	robot.respond(/list heroku apps/i, function(res){
		heroku.apps().list(function(err, apps){
			res.reply(JSON.stringify(apps));
		});
	});

}