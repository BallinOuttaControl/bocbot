module.exports = function(robot){

	robot.respond(/who was the last beer from/, function(res){
		if (robot.auth.isAdmin(res.message.user))
			res.reply('Bocbot\'s last beer was from ' + robot.brain.get('lastBeerFrom') + '\nHe \'s had ' + robot.brain.get('totalbeersHad'));
		else
			res.sendPrivate('Sorry, only admins can do that');
	});

}