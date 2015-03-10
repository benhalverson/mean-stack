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
	src: __dirname + "/public_dir",
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

app.use(express.static(__dirname + "/public_dir"));
app.get("/partials/*", function(req, res){
	res.render("../../public_dir/app/" + req.params[0]);
});
//client side will handle routing
app.get("*", function(req, res){
	res.render("index");
});

var port = process.env.PORT || 4001;
app.listen(port);
console.log("Listening on port " + port + "...");