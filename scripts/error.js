module.exports = function(robot){

	robot.errors = {
		logChannel: 'bocbot-errors',

		// Get the stack trace and bold the error message before sending
		createError: function(err){
			var stackTraceLines = err.stack.split('\n');
			stackTraceLines[0] = '*' + stackTraceLines[0] + '*';
			return stackTraceLines.join('\n');
		}
	};
	
	// Set error callback
	robot.error(function(err, res){
		robot.logger.error(err);
		robot.messageRoom(robot.errors.logChannel, robot.errors.createError(err));
	});

	// Make a nonsense error for testing purposes
	robot.respond(/generate error/i, function(res){
		res.send(robot.somecrazyvaluethatisalwaysgoingtoremaindundefinedunlessbyblindlucksomeonesetsthistosomethingotherthanundefined);
	});
}