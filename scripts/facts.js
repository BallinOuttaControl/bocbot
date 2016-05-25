module.exports = function(robot){

	robot.facts = {
		sendFact: function(response){
			var apiUrl = 'http://numbersapi.com/random',
				fact = '';
			response.http(apiUrl).get()(function(err, res, body){
				if (!!err)
					return;
				response.send('Did you know: ' + body + '  #bocbotfacts');
			});
		}
	};

	robot.hear(/#corbin(.*)fact/i, function(res){
		robot.facts.sendFact(res);
	});
}