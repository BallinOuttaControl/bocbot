var Heroku = require('heroku-client'),
	heroku = new Heroku({ token: process.env.HEROKU_API_KEY });

module.exports = function(robot){

	robot.respond(/list heroku apps/i, function(res){
		var app = heroku.apps('bocbot-dev');
		app.info(function(err, app){
			res.reply(JSON.stringify(app));
		});
	});

}