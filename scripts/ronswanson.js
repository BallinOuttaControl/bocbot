// Commands:
//   bocbot ron swanson [quote] - Get a quote from Ron Swanson
//   bocbot ron swanson [quote] <number> - Get the specified number of quotes from Ron Swanson

var _ = require('underscore');

module.exports = function(robot){

	robot.ronswanson = {
		apiUrl: 'http://ron-swanson-quotes.herokuapp.com/v2/quotes',

		getQuote: function(numQuotes){
			var url = this.apiUrl;
			if (!!numQuotes && !!Number(numQuotes))
				url += '/' + numQuotes;

			var promise = new Promise(function(resolve, reject){
				robot.http(url).get()(function(err, res, body){
					if (!!err){
						robot.errors.log(err);
						reject(err);
						return;
					}

					var data = JSON.parse(body);
					if (!!data && _.isArray(data)){
						resolve(data.join('\n'));
					}
				});
			});

			return promise;
		}
	};

	robot.respond(/ron swanson( quote)*(.*)/i, function(res){
		var num = res.match[2].trim();
		robot.ronswanson.getQuote(num).then(function(val){
			res.send(val);
		})
		.catch(function(err){
			robot.errors.log('Error getting Ron Swanson quote for ' + res.message.user.name + ' in ' + res.message.room + '\n' + (!!err.stack ? err.stack : err));
			res.reply('Ron is busy right now');
		});
	});
}
