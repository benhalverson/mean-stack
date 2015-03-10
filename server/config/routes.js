var passport = require("passport");

module.exports = function(app){
	app.get("/partials/*", function(req, res){
		res.render("../../public_dir/app/" + req.params[0]);
	});
	app.post("/login", function(req, res, next){
		var auth = passport.authenticate("local", function(err, user){
			if(err) {
				console.log("passport err " + err);
				return next(err);
			}
			if(!user) { res.send({success:false}) }
			req.logIn(user, function(err){
				if(err) {
					console.log("passport err " + err);
					return next(err);
				}
				res.send({success:true, user: user});
			})
		})
		auth(req, res, next);
	});

//client side will handle routing
	app.get("*", function(req, res){
		res.render("index");
	});

};