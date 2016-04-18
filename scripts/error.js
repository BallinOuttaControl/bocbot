module.exports = function(robot){
	
	robot.error(function(err, res){
		robot.logger.error(err);

		if (!!res)
			res.reply('Does not compute!');
	});

}