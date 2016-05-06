// Commands:
//   bocbot pug bomb # - Bomb this channel with the specified number of pugs

var _ = require('underscore');

module.exports = function(robot){

	robot.pugbomb = {
		pugmeUrl: 'http://pugme.herokuapp.com/bomb?count=',
		pugBombLikelihood: 5, // Pug bomb will happen one in this many times
		pugBomberRole: 'pugbomber',
		limitedPugBomberRole: 'limitedpugbomber',
		pugBombReplies: [
			'There will be no more of that.  Take your {{number}} pugs elsewhere.',
			'Nope.  Nobody needs to see that many pugs.',
			'Why do you think we all need to see {{number}} pugs?',
			'No pugs for you!',
			'{{number}} pugs... {{number}} PUGS??  Absolutely not.',
			'http://i.imgur.com/cUJd5aO.jpg'
		],

		doBomb: function(response, numPugs){
			var responses = [];
			response.http(robot.pugbomb.pugmeUrl + numPugs).get()(function(err, res, body){
				var pugs = JSON.parse(body).pugs;
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
		if (robot.auth.isAdmin(res.message.user) || robot.auth.hasRole(res.message.user, robot.pugbomb.pugBomberRole)){ // User has full pugbomb permissons
			return robot.pugbomb.doBomb(res, number);
		}
		else if (robot.auth.hasRole(res.message.user, robot.pugbomb.limitedPugBomberRole)){ // User has limited pugbomb permissions
			if (robot.util.random(robot.pugbomb.pugBombLikelihood) === 0)
				return robot.pugbomb.doBomb(res, number);
			else
				return robot.pugbomb.denyBomb(res, number);
		}
		else{ // User has no pugbomb permissions
			return robot.pugbomb.denyBomb(res, number);
		}
	});
}