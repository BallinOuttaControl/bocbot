var _ = require('underscore');

module.exports = function(robot){

	var pugBombReplies = [
		'There will be no more of that.  Take your {{number}} pugs elsewhere.',
		'Nope.  Nobody needs to see that many pugs.',
		'Why do you think we all need to see {{number}} pugs?',
		'No pugs for you!',
		'{{number}} pugs... {{number}} PUGS??  Absolutely not.',
		'http://i.imgur.com/cUJd5aO.jpg'
	];

	var pugBomberRole = 'pugbomber';

	robot.respond(/pug bomb( (\d+))?/i, function(res){
		var number = res.match[2] || 5;
		if (robot.auth.isAdmin(res.message.user) || robot.auth.hasRole(res.message.user, pugBomberRole)){
			var pugmeUrl = 'http://pugme.herokuapp.com/bomb?count=',
				resultArr = [];
			res.http(pugmeUrl + number).get()(function(err, results, body){
				var pugs = JSON.parse(body).pugs;
				_.each(pugs, function(pug){
					resultArr.push(res.send(pug));
				});
			});
			return resultArr;
		}
		else{
			var index = Math.floor(Math.random() * pugBombReplies.length),
				reply = pugBombReplies[index].replace(/{{number}}/g, number.trim());
			res.reply(reply);
		}
	});

}