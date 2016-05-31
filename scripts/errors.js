module.exports = function(robot){

	robot.errors = {
		logChannel: 'bocbot-errors',

		// Get the stack trace and bold the error message before sending
		formatError: function(err){
			var lines = [];
			if (!!err.stack) // 'err' is error object with stack trace
				lines = err.stack.split('\n');
			else if (err.indexOf('\n') >= 0) // 'err' is just an array of strings
				lines = err.split('\n');
			else // Error is just a string
				lines = [err];

			// Bold first line of array
			lines[0] = '*' + lines[0] + '*';

			return lines.join('\n')
		},

		// Do error logging
		log: function(err){
			robot.logger.error(err);
			var formattedErrMsg = this.formatError(err);
			robot.messageRoom(this.logChannel, formattedErrMsg);
		}
	};
	
	// Set error callback
	robot.error(function(err, res){
		robot.errors.log(err);
	});

	// Make a nonsense error for testing purposes
	robot.respond(/generate error/i, function(res){
		res.send(robot.somecrazyvaluethatisalwaysgoingtoremaindundefinedunlessbyblindlucksomeonesetsthistosomethingotherthanundefined);
	});
}