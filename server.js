var express = require("express");
var stylus = require("stylus");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

function compile(str, path) {
	return stylus(str).set("filename", path);
}

app.set("views", __dirname + "/server/views");
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(stylus.middleware({
	src: __dirname + "/public",
	compile: compile
}
));
//Doesnt seem to work
//var MongoURL = process.env.MONGO_URL;
//mongoose.connect("MongoURL");


if(env === "development"){
	mongoose.connect("mongodb://localhost/mean-sample");
}
else {
	mongoose.connect("mongodb://admin:G00dF00d@ds049641.mongolab.com:49641/mean-sample")
}


var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error ... "));
db.once("open", function callback() {
	console.log("mean-sample db opened");
});

//todo: move to model folder
var messageSchema = mongoose.Schema({message: String});

var Message = mongoose.model("Message", messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
	mongoMessage = messageDoc.message;
});


app.use(express.static(__dirname + "/public"));
app.get("/partials/:partialPath", function(req, res){
	res.render("partials/" + req.params.partialPath);
});
//client side will handle routing
app.get("*", function(req, res){
	res.render("index", {
		mongoMessage: mongoMessage
	});
});

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port " + port + "...");