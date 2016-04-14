module.exports = function(robot){
	
	robot.error(function(err, res){
		robot.logger.error("Does not compute");

		if (!!res)
			res.reply('Does not compute!');
	});

}