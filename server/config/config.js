var path = require("path");
var rootPath = path.normalize(__dirname + "/../../" );
module.exports = {
	development: {
		db: "mongodb://localhost/mean-sample",
		rootPath: rootPath,
		port: process.env.PORT || 4001
	},
	production: {
		db: "mongodb://admin:G00dF00d@ds049641.mongolab.com:49641/mean-sample",
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
};