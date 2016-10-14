module.exports = function(robot){

	robot.router.post('/hubot/say', function(req, res){
		var body = req.body,
			room = body.room,
			message = body.message;

		robot.messageRoom(room, message);
		res.send('OK');
	});

	// Commented out becasue we don't want to serve out sensitive information
	// This is just here for testing and example purposes
	// robot.router.get('/users', function(req, res){
	// 	var users = robot.brain.users();
	// 	res.setHeader('Content-Type', 'application/json');
	// 	res.send(robot.util.formatJson(users, null, '\t'));
	// });

};
