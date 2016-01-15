var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/quickDB");

var movieSchema = mongoose.Schema({ 
			title: String,
			director: String,
			year: Number,
			duration: Number,
			country: String,
			category: String,
			score: Number,
			sinopsis: String,
			image: String,
			comments: [{
				user: String,
				comment: String,
				date: { type: Date, default: Date.now }
				}]
			});

module.exports = {
	getmovieModel: function() {
		return connection.model("movie", movieSchema);
	}
};



