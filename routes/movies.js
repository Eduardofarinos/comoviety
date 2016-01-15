var express = require('express');
var router = express.Router();
var fs = require('fs');
var movieModel = require(__dirname + '/../models/movie'); 


/***************************

	Add a new movie	

***************************/

router.get('/newmovie', function(req, res, next) {
	
	res.render('newmovie', {user: req.session.username});
});


router.post('/newmovie', function(req, res, next) {
	if(req.session.username){
		movieModel.findmovie(req.body, function(error, resp) {
			if (error) {
				res.send("Ha ocurrido un error al buscar la pelicula");
			} else {
				if (!resp) {
					movieModel.addmovie(req.body, function(err, result) {
						if (err) {
							res.send("Ha ocurrido un error al añadir la pelicula");
						} else {
							res.render('show', {result, user: req.session.username});
						}
					});
				} 
				else {
					res.render('exist', {user: req.session.username});
				}
			}
		});
	}else{
		res.render('nolog', {user: req.session.username});
	}
});


/***************************

	find a movie	

***************************/

router.get('/search', function(req, res, next) {
	
	res.render('search', {user: req.session.username});	
});


router.post('/search', function(req, res, next) {
	
	movieModel.findmovie(req.body, function(err, result) {
		if (err) {
			res.send("Ha ocurrido un error al buscar la pelicula");
		} else {
			if (!result) {
				res.render('noexist', {user: req.session.username});
			} 
			else {
				res.render('show', {result, user: req.session.username});
			}
		}
	});
});

router.get('/:title', function(req, res, next) { 
	var name = req.params.title;
	movieModel.findtitle(name, function(err, result) {
		if (err) {
			res.send("Ha ocurrido un error al buscar la pelicula");
		} else {
			if (!result) {
				res.render('noexist', {user: req.session.username});
			} 
			else {
				res.render('show', {result, user: req.session.username});
			}
		}
	});
});

/***************************

	Add new comment 

***************************/

router.post('/newcomment', function(req, res, next) {
	
	if(req.session.username){
		req.body.user = req.session.username;
		movieModel.addcomment(req.body, function(err, result){
			if (err) {
				res.send("Ha ocurrido un error");
			} else {
				movieModel.findmovie(req.body, function(err, result) {
					if (err) {
						res.send("Ha ocurrido un error al buscar la pelicula");
					} else {
						if (!result) {
							res.send("No existe esa pelicula");
						} 
						else {
							res.render('show', {result, user: req.session.username});
						}
					}
				});
			}	
		});
	}else{
		res.render('nolog', {user: req.session.username});
	}
});

router.get('/category/:categ', function(req, res, next) {
	var ca = req.params.categ;
	movieModel.viewcategory(ca, function(err, result){
		if(err){
			res.send("ha ocurrido un error");

		} else{
			if(result==""){
				res.render('nocategory', {user: req.session.username});
			}else{
				res.render('category', {result, user: req.session.username});
			}
		}
	});
});

module.exports = router;