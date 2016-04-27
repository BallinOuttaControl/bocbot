var path = require('path'),
	express = require('express'),
	swig = require('swig');

module.exports = function(robot){

	var compressCss = false;
	var staticFilesDir = path.join(__dirname, '../', 'web', 'static');
	
	// Configure robot.router
	robot.router.engine('swig', swig.renderFile);
	robot.router.set('view engine', 'swig');
	robot.router.set('views', path.join(__dirname, '../', 'web', 'views'));

	// Serve static files
	robot.router.use('/static', express.static(staticFilesDir));

	// Serve index
	robot.router.get('/', function (req, res) {
		res.render('index');
	});

	// Serve error page
	robot.router.get('/error', function (req, res){
		res.render('error');
	});

}