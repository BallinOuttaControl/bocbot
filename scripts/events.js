var _ = require('underscore'),
	slackEvents = require('@slack/client/lib/clients/events/rtm').EVENTS;

module.exports = (robot) => {
	_.extend(robot.adapter.client.rtm, {
		events: slackEvents
	});
};
