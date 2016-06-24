var _ = require('underscore');

module.exports = function(robot){

	robot.annoy = {
		greeting: 'Hey, want to hear the most annoying sound in the world?',
		salutation: 'Alright... alright.  I\'m done.',
		sessions: {},
		restrictedChannels: [ 'general', 'random', 'boc-events', 'boc-women' ], // Channels we don't ever want annoyed
		sound: {
			chars: ['A', 'E', 'I', 'G', 'H', 'E'],  // Characters that comprise the sound text
			charOccurrenceRates: [
				{ char: 'A', min: 10, max: 15 },
				{ char: 'E', min: 15, max: 20 },
				{ char: 'I', min: 8, max: 12 },
				{ char: 'G', min: 3, max: 9 },
				{ char: 'H', min: 10, max: 15 }
			]
		},
		timeUnitMsMap: {
			hour: 3600000,
			minute: 60000,
			second: 1000
		},

		makeSound: function(){
			var sound = '';
			_.each(this.sound.chars, function(char){
				var rate = _.where(robot.annoy.sound.charOccurrenceRates, { char: char })[0];
				var random = Math.floor(Math.random() * (rate.max - rate.min)) + rate.min;

				for (var i = 0; i < random; i++){
					sound += char;
				}
			});
			return sound;
		},

		start: function(room, annoyer, intervalMs, durationMs){
			var self = this,
				intervalLength = intervalMs || 2500,	  // 2.5 seconds if interval isn't specified
				durationLength = durationMs || 1000 * 45; // 45 Seconds if duration is not specified

			if (_.contains(this.restrictedChannels, room))
				return;

			// Send greeting
			robot.messageRoom(room, this.greeting);

			// Start annoying
			var interval = setInterval(function(){
				robot.messageRoom(room, self.makeSound());
			}, intervalLength);

			// Create annoy session
			var session = {
				interval: interval,
				annoyer: annoyer
			};

			// Save annoy session so we can clear it later
			this.sessions[room] = session;

			// Set clearInterval to execute and clear the annoy session at the appropriate time
			setTimeout(function(){
				var session = robot.annoy.sessions[room];
				clearInterval(session.interval);
				delete robot.annoy.sessions[room];
				robot.messageRoom(room, robot.annoy.salutation);
			}, durationLength);
		},

		stop: function(room, requester){
			var session = this.sessions[room];

			var isUserCurrentlyBeingAnnoyed = room === requester.room;
			// If the person requesting stop is the person who started the annoy session or an admin,
			// clear the session
			if (isUserCurrentlyBeingAnnoyed || robot.auth.isAdmin(requester) || requester.name === session.annoyer){
				clearInterval(session.interval);
				delete this.sessions[room];
			}
		},

		stopAll: function(){
			// Loop through all the current annoy sessions and clear them
			_.each(robot.annoy.sessions, function(session){
				clearInterval(session.interval);
			});
			this.sessions = {};
		}
	};

	// This function tries its best to match all common language scheduling syntaxes
	// For example:
	//	annoy me
	// 	annoy me for 10 minutes
	// 	annoy me every 10 minutes
	// 	annoy me every minute for 30 minutes
	// 	annoy me every 10 minutes for 2 hours
	// 	annoy me every minute for an hour
	// 	annoy me every 10 minutes for an hour
	// 	annoy me every minute for an hour
	// 	annoy me every second for a minute
	robot.respond(/annoy me( every (\d+)?( )?(second(s)?|minute(s)?|hour(s)?))?( for (a|an|\d+)? (second(s)?|minute(s)?|hour(s)?)+)?/i, function(res){
		var intervalTime = res.match[2] || '',
			intervalUnit = res.match[4] || '',
			intervalIsPlural = res.match[5] || res.match[6] || res.match[7],
			durationTime = res.match[9] || '',
			durationUnit = res.match[10] || '',
			durationIsPlural = res.match[11] || res.match[12] || res.match[13],
			intervalMs,
			durationMs;

		// Figure out interval time in milliseconds
		if (intervalTime && intervalUnit){
			var timeFactor = robot.annoy.timeUnitMsMap[intervalUnit.toLowerCase()];

			if (/a/i.test(intervalTime)) // 'a' or 'an' so we assume 1 unit
				intervalMs = timeFactor;
			else
				intervalMs = timeFactor * intervalTime;
		}

		// Figure out duration time in milliseconds
		if (durationTime && durationUnit){
			var timeFactor = robot.annoy.timeUnitMsMap[durationUnit.toLowerCase()];
			if (/a/i.test(durationTime))
				durationMs = timeFactor;
			else
				durationMs = timeFactor * durationTime;
		}

		// Start annoying
		robot.annoy.start(res.message.user.name, intervalMs, durationMs, res.message.user.name);
	});

	robot.respond(/annoy (.*)/i, function(res){
		var user = res.match[1];
		if (!user)
			res.reply('You must specify a user or channel');
		else{
			user = user.trim();
			if (user[0] === '@' || user[0] === '#')
				user = user.substring(1);
		}

		robot.annoy.start(user, res.message.user.name);
	});

	robot.respond(/stop annoying (.*)/i, function(res){
		var room = res.match[1];
		if (!room)
			res.reply('You must specify a room');
		else{
			room = room.trim();
			if (room === 'me')
				room = res.message.user.name;
			if (room[0] === '#' || room[0] === '@')
				room = room.substring(1);
		}

		robot.annoy.stop(room, res.message.user);
	});

	robot.respond(/stop all annoyances/i, function(res){
		if (!robot.auth.isAdmin(res.message.user))
			return;

		robot.annoy.stopAll();
	});

	robot.respond(/current annoyances/i, function(res){
		var ret = [];
		_.each(robot.annoy.sessions, function(value, key){
			ret.push(key + ' is being annoyed by ' + value.annoyer);
		});

		if (ret.length > 0)
			res.send(ret.join('\n'));
		else
			res.send('I am not annoying anyone at this time');
	});
}
