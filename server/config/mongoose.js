var mongoose = require("mongoose");
module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error ... "));
	db.once("open", function callback() {
		console.log("mean-sample db opened");
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		userName: String
	})
	var User = mongoose.model("User", userSchema);

	User.find({}).exec(function(err, collection){
		if(collection.length === 0) {
			User.create({firstName: "Ben", lastName: "Halverson", userName: "Ben"});
			User.create({firstName: "Melissa", lastName: "Halverson", userName: "Melissa"});
			User.create({firstName: "Kevin", lastName: "Halverson", userName: "Kev"});
		}
	})

};