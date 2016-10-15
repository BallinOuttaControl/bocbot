var Helper = require('hubot-test-helper');
var expect = require('chai').expect;
var co = require('co');

var helper = new Helper('../scripts');

describe('Basic Functionality', () => {
	var room = null;

	beforeEach(() => {
		room = helper.createRoom();
	});

	afterEach(() => {
		room = room.destroy();
	});

	context('Ping', () => {
		// beforeEach(() => {
		// 	// co(() => {
		// 		room.user.say('testuser', 'bocbot ping');
		// 	// });
		// });
		this.

		it('Reply to user', (done) => {
			room.user.say('testuser', 'bocbot ping').then(() => {
				expect(room.messages).to.eql([
					['testuser', 'bocbot ping'],
					['bocbot', 'PONG']
				]);
				done();
			});
		});
	});
});
