module.exports = function(robot){

	var errorImageUrl = 'http://i.imgur.com/1QXZmWG.jpg';
	
	robot.error(function(err, res){
		robot.logger.error(err);

		if (!!res)
			res.reply('Does not compute!\n' + errorImageUrl);
	});

}