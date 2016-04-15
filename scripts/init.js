module.exports = function(robot){
	
	robot.brain.set('testmemory', 'memory remembered');

	robot.respond(/memorytest/i, function(res){
		res.respond(robot.brain.get('testmemory'));
	});

	robot.respond(/memorytest (.*)/i, function(res){
		var newMemory = res.match[1];
		var oldMemory = robot.brain.get('testmemory');
		robot.brain.set('memorytest', newMemory);
		res.respond('Memory changed from ' + oldMemory + ' to ' + newMemory);
	});

}