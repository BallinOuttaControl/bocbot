// Commands
//   bocbot [give me|spread some] joy|love - Get a random meme from thecodinglove.com

var cheerio = require('cheerio');

module.exports = function(robot){
	
	robot.codinglove = {

		url: 'http://thecodinglove.com/random',
		textSelector: 'body .post h3',
		imageSelector: 'body .post img',

		loadRequestData: function(data){
			this.$ = cheerio.load(data);
		},

		send: function(response, location){
			var self = this,
				url = !!location ? location : this.url;

			// - Get a random image from thecodinglove
			// - Scrape the image url and caption text from the webpage
			//   - Ignore 'i.minus.com' because it doesn't exist anymore
			// - Send it
			response.http(url).get()(function(err, res, body){
				if (!!err){
					response.send('Unable to get meme from thecodinglove.com');
					robot.errors.log(err);
					return;
				}

				// If site responds with a redirect, which it does when you hit '/random', 
				// get new location from response headers and recurse
				if (res.statusCode == 301 || res.statusCode == 302){
					var loc = res.headers['location'];
					return self.send(response, loc);
				}

				// Initialize cheerio
				self.loadRequestData(body);

				// Scrape important data from page
				var caption = self.getText();
				var imgUrl = self.getImage();

				// If image url is from 'i.minus.com', do the request again because that site no longer works
				if (imgUrl.indexOf('i.minus.com') >= 0)
					return self.send(response);

				response.send(robot.util.capitalize(caption) + '\n' + imgUrl);
			});
		},

		getImage: function(){
			return this.$(this.imageSelector).first().attr('src');
		},

		getText: function(){
			return this.$(this.textSelector).first().text();
		}
	};

	robot.respond(/((give me|spread) some )?(joy|love)/i, function(res){
		robot.codinglove.send(res);
	});
}