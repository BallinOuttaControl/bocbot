module.exports = (robot) ->
	robot.hear /pug me/i, (res) ->
		res.send "Sorry, I don't do that anymore"