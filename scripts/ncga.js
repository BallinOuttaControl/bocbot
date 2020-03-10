// Commands:
//   bocbot soiltemps {id} - Get NCGA 4" soil temps map for given identifier

let ncga = require('../lib/ncga');

module.exports = function(robot){

	robot.respond(/soiltemps (\S+)/i, (res) => {
		let mapID = ncga.maps[res.match[1]];
		if (!mapID)
			return res.reply(`I'm not aware of any map with an ID of \`${res.match[1]}\``);

		ncga.urls.imageUrl(mapID)
			.then(url => res.reply(`<${url}|${mapID}>`))
			.catch(e => res.reply(`ERROR: ${e.message || e}`));
	});
}
