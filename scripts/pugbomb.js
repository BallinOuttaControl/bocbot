// Commands:
//   bocbot pug bomb - Bomb this channel with 3 pugs
//   bocbot pug bomb # - Bomb this channel with the specified number of pugs

var _ = require('underscore');

module.exports = function(robot){

	robot.pugbomb = {
		pugmeUrl: 'http://pugme.herokuapp.com/bomb?count=',
		pugBombLikelihood: 2, // Odds of pugbomb happening (rand() % this_number)
		pugBombReplies: [
			'Take your {{number}} pugs elsewhere.',
			'Nope.  Nobody needs to see that many pugs.',
			'Why do you think we all need to see {{number}} pugs?',
			'{{number}} pugs... {{number}} PUGS??  Absolutely not.',
			'http://i.imgur.com/cUJd5aO.jpg'
		],

		doBomb: function(response, numPugs){
			response.http(robot.pugbomb.pugmeUrl + numPugs).get()(function(err, res, body){
				if (!!err){
					response.reply('There was an error getting your pugs.');
					robot.errors.log(err);
					return;
				}

				var pugs = JSON.parse(body).pugs,
					responses = [];
				_.each(pugs, function(pug){
					responses.push(response.send(pug));
				});
				return responses;
			});
		},

		denyBomb: function(response, numPugs){
			var index = Math.floor(Math.random() * robot.pugbomb.pugBombReplies.length),
				reply = robot.pugbomb.pugBombReplies[index].replace(/{{number}}/g, numPugs);
			response.reply(reply);
		}
	};

	robot.respond(/pug bomb( (\d+))?/i, function(res){
		var number = res.match[2] || 3;
		// if (robot.auth.isAdmin(res.message.user) || robot.auth.hasRole(res.message.user, robot.roles.pugBomber)){ // User has full pugbomb permissons
			return robot.pugbomb.doBomb(res, number);
		// }
		// else if (robot.auth.hasRole(res.message.user, robot.roles.limitedPugBomber)){ // User has limited pugbomb permissions
		// 	if (robot.util.random(robot.pugbomb.pugBombLikelihood) === 0)
		// 		return robot.pugbomb.doBomb(res, number);
		// 	else
		// 		return robot.pugbomb.denyBomb(res, number);
		// }
		// else{ // User has no pugbomb permissions
		// 	return robot.pugbomb.denyBomb(res, number);
		// }
	});
}
