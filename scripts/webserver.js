var path = require('path'),
	express = require('express'),
	swig = require('swig');

module.exports = function(robot){

	var compressCss = false,
		webDirPath = path.join(__dirname, '../', 'web'),
		staticFilesDir = path.join(webDirPath, 'static'),
		viewsDirPath = path.join(webDirPath, 'views');

	// Configure robot.router
	robot.router.engine('swig', swig.renderFile);
	robot.router.set('view engine', 'swig');
	robot.router.set('views', viewsDirPath);

	// Serve static files
	robot.router.use('/static', express.static(staticFilesDir));

	// Serve index
	robot.router.get('/', function (req, res) {
		res.render('index');
	});
	robot.router.get('/index', function(req, res){
		res.redirect('/'); // Redirect '/index' to '/'
	});

	// Serve admin page
	robot.router.get('/admin', (req, res) => {
		res.render('admin');
	});

	// Serve error page
	robot.router.get('/error', function (req, res){
		res.render('error');
	});
};
