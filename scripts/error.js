module.exports = function(robot){

	robot.errors = {
		imageUrl: 'http://i.imgur.com/1QXZmWG.jpg',
		logChannel: 'bocbot-errors',
		errorMessage: 'ERROR while processing a request for {{user}} in {{room}}.  {{stacktrace}}',

		createError: function(err, res){
			var errorMsg = this.errorMessage.replace(/{{user}}/g, res.message.user.name)
											.replace(/{{room}}/g, res.message.room)
											.replace(/{{stacktrace}}/g, err.stack);
			return errorMsg;
		}
	};
	
	robot.error(function(err, res){
		robot.logger.error(err);
		robot.messageRoom(robot.errors.logChannel, "ERROR");
	});

	robot.respond(/generate error/i, function(res){
		res.send(robot.somecrazyvaluethatisalwaysgoingtoremaindundefinedunlessbyblindlucksomeonesetsthistosomethingotherthanundefined);
	});
}