var crypto = require('crypto');
var base64 = require('../lib/base64');

module.exports = function(robot){

	robot.router.post('/hubot/say', function(req, res){
		var body = req.body,
			room = body.room,
			message = body.message;

		robot.messageRoom(room, message);
		res.send('OK');
	});

	robot.router.get('/api/token', (req, res) => {
		robot.util.generateToken((err, buffer) => {
			var token = base64.encode(buffer);
			res.setHeader('Content-Type', 'text/plain');
			res.send(token);
		});
	});
};
