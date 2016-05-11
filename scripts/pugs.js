// Commands:
//   bocbot pug bomb - Bomb this channel with 3 pugs
//   bocbot pug bomb # - Bomb this channel with the specified number of pugs

var _ = require('underscore');

module.exports = function(robot){

	robot.pugs = {
		pugmeUrl: 'http://pugme.herokuapp.com/bomb?count=',
		pugBombLikelihood: 5, // Pug bomb will happen one in this many times
		pugBomberRole: 'pugbomber',
		limitedPugBomberRole: 'limitedpugbomber',
		pugBombReplies: [
			'Take your {{number}} pugs elsewhere.',
			'Nope.  Nobody needs to see that many pugs.',
			'Why do you think we all need to see {{number}} pugs?',
			'{{number}} pugs... {{number}} PUGS??  Absolutely not.',
			'http://i.imgur.com/cUJd5aO.jpg'
		],

		doBomb: function(response, numPugs){
			response.http(this.pugs.pugmeUrl + numPugs).get()(function(err, res, body){
				var pugs = JSON.parse(body).pugs,
					responses = [];
				_.each(pugs, function(pug){
					responses.push(response.send(pug));
				});
				return responses;
			});
		},

		denyBomb: function(response, numPugs){
			var index = Math.floor(Math.random() * this.pugs.pugBombReplies.length),
				reply = this.pugs.pugBombReplies[index].replace(/{{number}}/g, numPugs);
			response.reply(reply);
		}
	};

	robot.respond(/pug bomb( (\d+))?/i, function(res){
		var number = res.match[2] || 3;
		if (robot.auth.isAdmin(res.message.user) || robot.auth.hasRole(res.message.user, robot.pugs.pugBomberRole)){ // User has full pugbomb permissons
			return robot.pugs.doBomb(res, number);
		}
		else if (robot.auth.hasRole(res.message.user, robot.pugs.limitedPugBomberRole)){ // User has limited pugbomb permissions
			if (robot.util.random(robot.pugs.pugBombLikelihood) === 0)
				return robot.pugs.doBomb(res, number);
			else
				return robot.pugs.denyBomb(res, number);
		}
		else{ // User has no pugbomb permissions
			return robot.pugs.denyBomb(res, number);
		}
	});
}