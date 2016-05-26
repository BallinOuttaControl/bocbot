// Commands:
//   bocbot [give me a ][random ] fact - Gets a random fact
//   bocbot this day in history - Gets a random historical fact about today's date
//   bocbot this day in history <date> - Gets a random historical fact about the specified date

module.exports = function(robot){

	robot.facts = {
		factApiUrl: 'http://numbersapi.com/random',
		dateFactApiUrl: 'http://numbersapi.com/{{month}}/{{day}}/date',
		factHashTag: '#bocbotfacts',

		sendFact: function(response){
			var self = this;
			robot.http(this.factApiUrl).get()(function(err, res, body){
				if (!!err){ // Error processing request
					robot.error.log(err);
					return;
				}
				else if (body.indexOf('<html>') > 0) // Request was successful but the site returned an nginx error page
					return;

				response.send(body + '  ' + self.factHashTag);
			});
		},

		sendDateFact: function(response, date){
			var self = this,
				date = !!date ? new Date(date) : new Date(),  // If a date was not passed in, use today's date
				month = date.getMonth() + 1,
				day = date.getDate(),
				url = this.dateFactApiUrl.replace(/{{month}}/, month).replace(/{{day}}/, day);
			robot.http(url).get()(function(err, res, body){
				if (!!err){
					robot.error.log(err);
					return;
				}

				response.send(body);
			});
		}
	};

	robot.hear(/#(.*)fact/i, function(res){
		robot.facts.sendFact(res);
	});

	robot.respond(/(give me a )*(random )*fact/i, function(res){
		robot.facts.sendFact(res);
	});

	robot.respond(/this day in history(.*)/i, function(res){
		if (!!res.match[1]){
			var date = res.match[1].trim();
			robot.facts.sendDateFact(res, date);
		}
		else
			robot.facts.sendDateFact(res);
	});
}