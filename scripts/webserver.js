var path = require('path'),
	express = require('express'),
	swig = require('swig-templates'),
	base64 = require('../lib/base64');

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
	robot.router.get('/admin/:userid/:token', (req, res) => {
		var userid = base64.decode(req.params.userid).toString();
		var token = base64.decode(req.params.token).toString('base64');
		console.log(`userid = ${userid}  |  token = ${token}`);
		res.render('admin');
	});

	// Serve error page
	robot.router.get('/error', function (req, res){
		res.render('error');
	});
};
