var _ = require('underscore'),
	scheduler = require('node-schedule');

module.exports = function(robot){

	robot.scheduler = {

		scheduleJob: function(date, task){

			// If the 'executionDate' is a string, parse it into a Date
			if (!date instanceof Date)
				date = new Date(date);

			// Fail if task isn't a function
			if (typeof(task) !== 'function')
				return 'Task must be a function';

			var job = scheduler.scheduleJob(date, task);
			var jobJson = JSON.stringify(job);
			robot.messageRoom('connor', jobJson);
			robot.brain.addJob(job);
			return 'Job scheduled';
		},

		addJob: function(job){

			// If ScheduledJobs isn't defined, define it
			if (!robot.brain.getObject('ScheduledJobs'))
				robot.brain.setObject('ScheduledJobs', []);

			var jobs = robot.brain.getObject('ScheduledJobs');
			jobs.push(job);
			robot.brain.setObject(jobs);
		}
	};

	robot.respond(/job test/, function(res){
		var date = '6/1/2016 8:21 pm';
		res.send(robot.scheduler.scheduleJob(date, function(){
			robot.messageRoom('connor', 'it works!');
		}));
	});
}
