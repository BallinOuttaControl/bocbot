// Commands:
//   bocbot soiltemps {id} - Get NCGA 4" soil temps map

let ncga = require('../lib/ncga');

module.exports = function(robot){

	robot.respond(/soil ?temps?(?: (\S+))?$/i, async (res) => {
		let mapID = ncga.maps[res.match[1] || 'us'];
		if (!mapID)
			return res.reply(`I'm not aware of any map with an ID of \`${res.match[1]}\``);

		let url = await ncga.urls.imageUrl(mapID);
		return res.reply(`<${url}|${mapID}>`);

	});
}
