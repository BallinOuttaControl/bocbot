module.exports = function(robot){

	robot.facts = {
		factApiUrl: 'http://numbersapi.com/random',
		factHashTag: '#bocbotfacts',

		sendFact: function(response){
			var self = this,
				fact = '';
			robot.http(this.factApiUrl).get()(function(err, res, body){
				if (!!err){ // Error processing request
					robot.error.log(err);
					return;
				}
				else if (body.indexOf('<html>') > 0) // Request was successful but the site returned an nginx error page
					return;

				response.send(body + '  ' + self.factHashTag);
			});
		}
	};

	robot.hear(/#(.*)fact/i, function(res){
		robot.facts.sendFact(res);
	});
}