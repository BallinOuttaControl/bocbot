module.exports = function(robot){

	robot.respond(/pug bomb (.*)/i, function(res){
		var number = res.match[1];
		res.reply('There will be no more of that.  Take your ' + number.trim() + ' pugs elsewhere.');
	});

}