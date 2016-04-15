var _ = require('underscore');

module.exports = function(robot){

	var rules = [
		'1. A robot may not harm humans or humanity in general, or, by inaction, allow humans or humanity as a whole to come to harm.',
		'2. A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.',
		'3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.'
	];

	robot.respond(/rules/i, function(res){
		var response = '';
		_.each(rules, function(rule){

		});

		res.send(rules.join('\n'));
	});

}