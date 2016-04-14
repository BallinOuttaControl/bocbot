module.exports = function(robot){

	var thankYouResponses = [
		"You're welcome!",
		"No problem."
	];

	robot.hear(/(thanks|thank you) bocbot/i, function(res){
		var index = Math.floor(Math.random() * thankYouResponses.length);
		res.reply(thankYouResponses[index]);
	});

	robot.respond(/open the (.*) door/i, function(res){
		var doorType = res.match[1];
		if (doorType == 'pod bay')
			res.reply("I'm afraid I can't let you do that.");
		else
			res.reply('Opening ' + doorType + ' doors.');
	});

	robot.hear(/I like pie/i, function(res){
		robot.emote('I like pie too');
	});

	robot.respond(/(you are|you're)(.*) slow/i, function(res){
		setTimeout(function(){
			res.reply('Who you calling slow?');
		}, 1000 * 15);
	});

	robot.respond(/(have|drink|consume)(.*) beer/i, function(){
		var sodasHad = robot.brain.get('totalBeersHad') * 1 || 0;
		if (sodasHad > 4)
			res.reply("I think I've had too many.  I need to sleep it off first.");
		else{
			res.reply("Sure thing!  _chugs soda_");
			robot.brain.set('totalSodasHad', sodasHad + 1);
		}
	});

	robot.respond(/sleep it off/i, function(res){
		robot.brain.set('totalBeersHad', 0);
		res.reply('zzzzz');
	});

}