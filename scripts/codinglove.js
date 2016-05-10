// Commands
//   bocbot [give me|spread some] joy|love - Get a random meme from thecodinglove.com

var cheerio = require('cheerio');

module.exports = function(robot){
	
	robot.codinglove = {

		url: 'http://thecodinglove.com/random',
		textSelector: 'body .post h3',
		imageSelector: 'body .post img',

		send: function(response, location){
			var self = this,
				url = !!location ? location : this.url;

			response.http(url).get()(function(err, res, body){
				if (!!err)
					return response.send('Unable to process request');

				if (res.statusCode == 301 || res.statusCode == 302){
					var loc = res.headers['location'];
					return self.send(response, loc);
				}

				var caption = self.getText(body);
				var imgUrl = self.getImage(body);

				// If image url is from 'i.minus.com', do the request again because that site no longer works
				if (imgUrl.contains('i.minus.com'))
					return self.send(response);

				response.send(caption[0].toUpperCase() + caption.substring(1) + '\n' + imgUrl);
			});
		},

		getImage: function(body){
			var $ = cheerio.load(body);
			return $(this.imageSelector).first().attr('src');
		},

		getText: function(body){
			var $ = cheerio.load(body);
			return $(this.textSelector).first().text();
		}
	};

	robot.respond(/((give me|spread) some )?(joy|love)/i, function(res){
		robot.codinglove.send(res);
	});
}