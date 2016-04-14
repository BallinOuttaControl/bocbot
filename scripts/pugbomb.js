module.exports = function(robot){

	var pugBombReplies = [
		'There will be no more of that.  Take your {{number}} pugs elsewhere.',
		'Nope.  Nobody needs to see that many pugs.',
		'Why do you think we all need to see {{number}} pugs?',
		'No pugs for you!',
		'{{number}} pugs... {{number}} PUGS??  Absolutely not.'
	];

	robot.respond(/pug bomb (.*)/i, function(res){
		var number = res.match[1],
			index = Math.floor(Math.random() * pugBombReplies.length),
			reply = pugBombReplies[index].replace(/{{number}}/g, number.trim());

		res.reply(reply);
	});

}