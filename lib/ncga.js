let axios = require('axios'),
	cheerio = require('cheerio'),
	config = require('./config');

let ncga = {
	auth: {
		getKey: () => {
			return new Promise((resolve, reject) => {

				// If we have a key stored and it isn't expired, return it
				if (ncga.auth.key && Date.now() - ncga.auth.keyTimestamp < config.ncga.key_timeout)
					return resolve(ncga.auth.key);

				// If we don't have a key stored already, get one before returning
				axios.get(ncga.urls.mainPage)
				    .then(res => {
				        let $ = cheerio.load(res.data);
				        let scriptText = $('script').get(14).children[0].data;
				        ncga.auth.key = decodeURIComponent(scriptText.match(/key=(\S+)"/i)[1]);
				        ncga.auth.keyTimestamp = Date.now();
				        return resolve(ncga.auth.key);
				    }).catch(err => reject(err));
			});
		}
	},
	maps: {
		us: 'us_soil_temps_640',
		nc: 'nc_soil_temps_640'
	},
	imageBytes: (mapIdentifier) => {
		return new Promise((resolve, reject) => {
			ncga.urls.imageUrl(mapIdentifier)
				.then(url => {
					axios.get(url, { responseType: 'arraybuffer' })
						.then(res => resolve(res.data))
						.catch(e => reject(e));
				}).catch(err => reject(err));
		});
	},
	urls: {
		mainPage: 'http://news.ncgapremium.com/index.cfm?show=1&mapID=20',
		mapBase: 'http://agwx.dtn.com/imgjsp/showmap.jsp',
		imageUrl: async (mapIdentifier) => {
			let key = await ncga.auth.getKey();
			return `${ncga.urls.mapBase}?map=${mapIdentifier}&key=${encodeURIComponent(key)}`;
		}
	}
};

module.exports = ncga;
