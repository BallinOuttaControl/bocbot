# Commands:
#   bocbot pug me - Receive a pug
#   bocbot how many pugs are there - Find out how many different pugs there are in the repository

module.exports = (robot) ->

	robot.respond /pug me/i, (msg) ->
		msg.http("http://pugme.herokuapp.com/random")
		.get() (err, res, body) ->
			msg.send JSON.parse(body).pug

	robot.respond /how many pugs are there/i, (msg) ->
		msg.http("http://pugme.herokuapp.com/count")
		.get() (err, res, body) ->
			msg.send "There are #{JSON.parse(body).pug_count} pugs."
