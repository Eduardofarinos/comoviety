var mongoose = require('mongoose');
var connection = mongoose.createConnection("mongodb://localhost/quickDB");


var userSchema = mongoose.Schema({ 
	username: String,
	email: String,
	password: String,	
});
			
			
module.exports = {
	getUserModel: function() {
		return connection.model("user", userSchema);
	}
};