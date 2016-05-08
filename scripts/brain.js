var _ = require('underscore');

module.exports = function(robot){

	// Extend hubot's 'brain' with our custom code
	_.extend(robot.brain, {
		getObject: function(key){
			var dataJson = robot.brain.get(key);
			return JSON.parse(dataJson);
		},

		setObject: function(key, data){
			var dataJson = JSON.stringify(data);
			robot.brain.set(key, dataJson);
		}
	});

	var mensRoom = 'boc-men',
	bocbotRules = [
		'1. A robot may not harm humans or humanity in general, or, by inaction, allow humans or humanity as a whole to come to harm.',
		'2. A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law.',
		'3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law.'
	],
	mensRoomRules = [
		'1. Thou shalt not speak of anything that happens within this channel to others not invited to this channel.',
		'2. Thou shalt not share opinions, confessions, secrets or any other private content with the enemies.'
	],
	basicRoomRules = [
		'1. Be nice.',
		'2. Keep spam in #random.',
		'3. Don\'t get bocbot drunk.'
	];

	robot.respond(/set redis data/i, function(res){
		robot.brain.setObject('bocbotRules', bocbotRules);
		robot.brain.setObject('mensRoomRules', mensRoomRules);
		robot.brain.setObject('basicRoomRules', basicRoomRules);
		robot.brain.set('mensRoom', 'boc-men');
	});
}