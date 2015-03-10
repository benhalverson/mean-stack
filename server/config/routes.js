
module.exports = function(app){
	app.get("/partials/*", function(req, res){
		res.render("../../public_dir/app/" + req.params[0]);
	});

//client side will handle routing
	app.get("*", function(req, res){
		res.render("index");
	});

};