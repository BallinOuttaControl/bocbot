module.exports = function(robot){

	var rules = [
		'A robot may not harm humans or humanity in general, or, by inaction, allow humans or humanity as a whole to come to harm.',
		'A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.',
		'A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.'
	];

	robot.respond(/rules/i, function(res){
		var response = '';
		for(var i = 0; i < rules.length; i++){
			response += (i + i) + ' ' + rules[i];
		}

		res.send(rules.join('\n'));
	});

}