module.exports = function(robot){

	var thankYouResponses = [
		"You're welcome!",
		"No problem."
	];

	robot.hear(/(thanks|thank you) bocbot/i, function(res){
		var index = Math.floor(Math.random() * thankYouResponses.length);
		res.reply(thankYouResponses[index]);
	});

	robot.hear(/I like pie/i, function(res){
		robot.send('I like pie too');
	});

	robot.respond(/open (.*) door/i, function(res){
		var doorType = res.match[1];
		if (doorType == 'pod bay')
			res.reply("I'm afraid I can't let you do that.");
		else
			res.reply('Opening ' + doorType + ' doors.');
	});

	robot.respond(/(you are|you're)(.*) slow/i, function(res){
		setTimeout(function(){
			res.reply('Who you callin\' slow?');
		}, 1000 * 15);
	});

	robot.respond(/(have|drink|consume)(.*) beer/i, function(res){
		var beersHad = robot.brain.get('totalBeersHad') || 0;
		if (beersHad > 4)
			res.reply("I think I've had too many.  I need to sleep it off first.");
		else{
			res.reply("Sure thing!  _chugs beer_");
			robot.brain.set('totalBeersHad', beersHad + 1);
		}
	});

	robot.respond(/sleep it off/i, function(res){
		robot.brain.set('totalBeersHad', 0);
		res.reply('zzzzz');
	});

}