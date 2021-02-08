var soap = require('soap');
var fmt = require('./format');

// Note this is proxied through the shitty Python server.
// var BASE_URL = "http://localhost:8000/api/"
// var BASE_URL = "http://localhost:9000/api/"
var BASE_URL = "https://stratus-api-heroku.herokuapp.com/api/";

function endpoint(path) {
	return BASE_URL + path + "?wsdl";
}

function call_api(url, method, args, callback) {
	fmt.log(url);
	soap.createClient(url, function(err, client) {
		if (err) {
			console.error("Error creating API endpoint client:");
			console.error(err);
		} else {
			client[method](args, callback);
		}
	});
}

// callback should take the parameters (error, result);
module.exports = {
	core: {
		auth: {
			signup: function(args, callback) {
				call_api(endpoint("core/auth"), "signup", args, callback);
			},
			signin: function(args, callback) {
				call_api(endpoint("core/auth"), "signin", args, callback);
			},
		},
		settings: {
			signup: function(args, callback) {
				call_api(endpoint("core/settings"), "signup", args, callback);
			},
			signin: function(args, callback) {
				call_api(endpoint("core/settings"), "signin", args, callback);
			},
		},
	},
}
