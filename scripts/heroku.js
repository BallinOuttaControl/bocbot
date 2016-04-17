var Heroku = require('heroku-client'),
	heroku = new Heroku({ token: process.env.HEROKU_API_KEY });

module.exports = function(robot){

	robot.respond(/list heroku apps/i, function(res){
		heroku.apps().list(function(err, app){
			res.respond(JSON.stringify(app));
		});
	});

}