var mongoose = require('mongoose');
var mov = require('./dbm').getmovieModel();

var model = {};


/***************************

	add a new movie

***************************/

model.addmovie = function(movieData, cb) {
	var aux = new mov(movieData);
	aux.save(cb);
}


/***************************

	find a movie	

****************************/

model.findmovie = function(movieData, cb) {
	
	mov.findOne({title: movieData.title}, cb);
}

model.findtitle = function(movieData, cb) {
	
	mov.findOne({title: movieData}, cb);
}

/***************************

	Add new comment

***************************/

model.addcomment = function(commentData, cb) {
		
	mov.findOne({title: commentData.title}, function(err, movie){
		movie["comments"].push({"user": commentData.user,
							    "comment": commentData.comment });
		movie.save(cb);
	});
}

model.viewcategory = function(type, cb) {

	mov.find({category: type}, cb);
}



module.exports = model;
