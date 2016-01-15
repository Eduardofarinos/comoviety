var mongoose = require('mongoose');
var user = require('./dbu').getUserModel();

var model = {};


/***************************

	Register a new user	

***************************/

model.registerUser = function(userData, cb) {

	var newuser = new user(userData);
	newuser.save(cb);
}


/***************************

	Login a user	

***************************/

model.loginUser = function(userData, cb) {
	
	user.findOne({username: userData.username, password: userData.password}, cb);
}

model.findUser = function(userData, cb) {
	
	user.findOne({username: userData.username}, cb);
}


module.exports = model;
