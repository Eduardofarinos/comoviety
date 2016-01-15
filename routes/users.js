var express = require('express');
var router = express.Router();
var userModel = require(__dirname + '/../models/user'); 


/***************************

	Register a new user	

***************************/

router.get('/register', function(req, res, next) {
	
	res.render('register', {});
});


router.post('/register', function(req, res, next) {
	userModel.findUser(req.body, function(err, result){
		if (!result){
			userModel.registerUser(req.body, function(err, user) {
				if (err) {
					res.send("Ha ocurrido un error en el registro del usuario");
				} else {
					req.session.username = user.username;
					res.render('index', {user: req.session.username});
				}
			});
		} else {
			res.render('usertaken', {});
		}
	});
	
});


/***************************

	Login a user	

***************************/

router.get('/login', function(req, res, next) {
	
	res.render('login', {});	
});


router.post('/login', function(req, res, next) {
	
	userModel.loginUser(req.body, function(err, user) {
		if (err) {
			res.send("Ha ocurrido un error en el login del usuario");
		} else {
			if (!user) {
				res.render ('loginfail', {});
			} 
			else {
				req.session.username = user.username;
				res.render('index', {user: req.session.username});	
			}
		}
	});
});


router.get('/logout', function(req, res, next) {
	
	req.session.destroy();
	res.render('index', {});
});

module.exports = router;