// Commands:
//   bocbot [give me a ][random] fact - Gets a random fact
//   bocbot this day in history - Gets a random historical fact about today's date
//   bocbot this day in history <date> - Gets a random historical fact about the specified date
//   bocbot [give me a ][random] cat fact - Gets a random cat fact

module.exports = function(robot){

	robot.facts = {
		factApiUrl: 'http://numbersapi.com/random',
		dateFactApiUrl: 'http://numbersapi.com/{{month}}/{{day}}/date',
		catFactApiUrl: 'http://catfacts-api.appspot.com/api/facts',
		errorMessages: {
			catfact: 'Error sending catfact for {{user}} in {{room}}\n{{error}}',
			datefact: 'Error sending a date fact for {{user}} in {{room}} about {{date}}\n{{error}}',
			fact: 'Error sending a fact for {{user}} in {{room}}\n{{error}}',
			factResponse: 'Error responding to a #*fact in {{room}}\n{{error}}'
		},

		getFact: function(){
			var self = this;

			// Wrap this api call in a promise so we can use this method synchronously
			var promise = new Promise(function(resolve, reject){
				robot.http(self.factApiUrl).get()(function(err, res, body){
					if (!!err){  // Error processing request
						robot.errors.log(err);
						reject(err.stack);  // Reject promise
						return;
					}
					else if (body.indexOf('<html>') > 0){  // Request was successful but the site returned an nginx error page
						reject('nginx error');  // Reject promise
						return;
					}

					// Fulfill promise
					resolve(body);
				});
			});

			return promise;
		},

		getCatFact: function(){
			var self = this;

			// Wrap this api call in a promise so we can use this method synchronously
			var promise = new Promise(function(resolve, reject){
				robot.http(self.catFactApiUrl).header('Accept', 'application/json').get()(function(err, res, body){
					if (!!err){
						robot.errors.log(err);
						reject(err.stack);  // Reject promise
						return;
					}
					else if (!body){
						reject('Body of response was empty');  // Reject promise
						return;
					}

					var data = JSON.parse(body);
					if (data.success !== 'true'){
						reject('API returned \'success = false\'');  // Reject promise
						return;
					}

					// Fullfill promise
					resolve(data.facts[0]);
				});
			});

			return promise;
		},

		getDateFact: function(date){
			var date = !!date ? new Date(date) : new Date(),  // If a date was not passed in, use today's date
				month = date.getMonth() + 1,
				day = date.getDate(),
				url = this.dateFactApiUrl.replace(/{{month}}/, month).replace(/{{day}}/, day);

			// Wrap this api call in a promise so we can use this method synchronously
			var promise = new Promise(function(resolve, reject){
				robot.http(url).get()(function(err, res, body){
					if (!!err){
						robot.errors.log(err);
						reject(err.stack);  // Reject promise
						return;
					}

					// Fulfill promise
					resolve(body);
				});
			});

			return promise;
		}
	};

	robot.respond(/#(.*)fact/i, function(res){
		robot.facts.getFact().then(function(val){
			res.send(val + '  #bocbotfacts');
		})
		.catch(function(err){
			var errMsg = robot.facts.errorMessages.factResponse.replace(/{{room}}/g, res.message.room)
															   .replace(/{{error}}/g, err);
			robot.errors.log(errMsg);
		});
	});

	robot.respond(/(give me a )*(random )*fact/i, function(res){
		robot.facts.getFact().then(function(val){
			res.send(val);
		})
		.catch(function(err){
			var errMsg = robot.facts.errorMessages.fact.replace(/{{user}}/g, res.message.user.name)
													   .replace(/{{room}}/g, res.message.room)
													   .replace(/{{error}}/g, err);
			robot.errors.log(errMsg);;
		});
	});

	robot.respond(/(give me a )*(random )*cat fact/i, function(res){
		robot.facts.getCatFact().then(function(val){
			res.send(val);
		})
		.catch(function(err){
			var errMsg = robot.facts.errorMessages.catFact.replace(/{{user}}/g, res.message.user.name)
														  .replace(/{{room}}/g, res.message.room)
														  .replace(/{{error}}/g, err);
			robot.errors.log(errMsg);
		})
	});

	robot.respond(/this day in history(.*)/i, function(res){
		if (!!res.match[1]){
			var date = res.match[1].trim();
			robot.facts.getDateFact(date).then(function(val){
				res.send(val);
			})
			.catch(function(err){
				var errMsg = robot.facts.errorMessages.dateFact.replace(/{{user}}/g, res.message.user.name)
															   .replace(/{{room}}/g, res.message.room)
															   .replace(/{{date}}/g, date)
															   .replace(/{{error}}/g, err);
				robot.errors.log(errMsg);
			});
		}
		else{
			robot.facts.getDateFact().then(function(val){
				res.send(val);
			})
			.catch(function(err){
				var errMsg = robot.facts.errorMessages.dateFact.replace(/{{user}}/g, res.message.user.name)
															   .replace(/{{room}}/g, res.message.room)
															   .replace(/{{date}}/g, 'today')
															   .replace(/{{error}}/g, err);
				robot.errors.log(errMsg);
			});
		}
	});
}