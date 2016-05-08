// Commands:
//   bocbot your rules - Make sure bocbot knows his place
//   bocbot room rules - Inform users about room rules

module.exports = function(robot){

	robot.respond(/(.*)room rules/i, function(res){
		if (res.message.room === robot.brain.get('mensRoom')){
			var rules = robot.brain.getObject('mensRoomRules');
			res.send(rules.join('\n'));
		}
		else{
			var rules = robot.brain.getObject('basicRoomRules');
			res.send(rules.join('\n'));
		}
	});

	robot.respond(/(.*)your rules/i, function(res){
		var bocbotRules = robot.brain.getObject('bocbotRules');
		res.send(bocbotRules.join('\n'));
	});
}