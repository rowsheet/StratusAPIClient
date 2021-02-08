var soap = require('./soap');
call_api = soap.call_api;

// var BASE_URL = "http://localhost:9000/api/"
var BASE_URL = "https://stratus-api-heroku.herokuapp.com/api/";

function endpoint(path) {
	return BASE_URL + path + "?wsdl";
}

module.exports = {
	core: {
		auth: {
			signup: function(args, success, error) {
				call_api(endpoint("core/auth"), "coreAuth", "signup", args, success, error);
			},
			signin: function(args, success, error) {
				call_api(endpoint("core/auth"), "coreAuth", "signin", args, success, error);
			},
		},
		settings: {
			signup: function(args, success, error) {
				call_api(endpoint("core/settings"), "coreSettings", "signup", args, success, error);
			},
			signin: function(args, success, error) {
				call_api(endpoint("core/settings"), "coreSettings", "signin", args, success, error);
			},
		},
	},
}
