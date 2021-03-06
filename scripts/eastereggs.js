// Commands:
//   bocbot whoami - Find out who you are
//   bocbot have|drink|consume a beer - Make bocbot drink a beer
//   bocbot sleep it off - Make bocbot sleep off his drunkenness

module.exports = function(robot){

	var thankYouResponses = [
		"You're welcome!",
		"No problem",
		"Not a problem",
		"It's no bother",
		"No problem at all",
		"It's my pleasure",
		"My pleasure",
		"It's nothing",
		"No, no.  Thank you!",
		"Sure thing"
	];

	var beerResponses = [
		"I think I've had too many",
		"I'm trashed"
	];

	robot.hear(/thank(s| you) bocbot/i, function(res){
		res.random(thankYouResponses);
	});

	robot.hear(/I like pie/i, function(res){
		res.send('I like pie too');
	});

	robot.respond(/open (.*) door/i, function(res){
		var doorType = res.match[1];
		if (doorType.replace('the ') == 'pod bay')
			res.reply("I'm afraid I can't let you do that.");
		else
			res.reply('Opening ' + doorType + ' doors.');
	});

	robot.respond(/you('re| are)(.*) slow/i, function(res){
		setTimeout(function(){
			res.reply('Who you callin\' slow?');
		}, 1000 * 15);
	});

	robot.respond(/(have|drink|consume)(.*) beer/i, function(res){
		var beersHad = robot.brain.get('totalBeersHad') || 0;
		if (beersHad > 4){
			var lastBeerFrom = robot.brain.get('lastBeerFrom');
			var initialResponse = robot.util.random(beerResponses);
			res.reply(initialResponse + ".  " + lastBeerFrom + " got me too drunk.  I need to sleep it off first.");
		}
		else{
			res.reply("Sure thing!  _chugs beer_");
			robot.brain.set('totalBeersHad', beersHad + 1);
			robot.brain.set('lastBeerFrom', res.message.user.name);
		}
	});

	robot.respond(/sleep it off/i, function(res){
		robot.brain.set('totalBeersHad', 0);
		res.reply('zzzzz');
	});
}
