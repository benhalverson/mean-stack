var express = require("express");
var stylus = require("stylus");
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

function compile(str, path) {
	return stylus(str).set("filename", path);
}

app.set("views", __dirname + "/server/views");
app.set("view engine", "jade");
app.use(stylus.middleware({
	src: __dirname + "/public",
	compile: compile
}
));

app.use(express.staic(__dirname + "/public"));

//client side will handle routing
app.get("*", function(req, res){
	res.render("index");
});

var port = 4000;
app.listen(port);
console.log("Listening on port " + port + "...");