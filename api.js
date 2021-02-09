//-------------------------------------------------------------------------------
// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
//-------------------------------------------------------------------------------
if (typeof document != 'undefined') {
	// You're in a web-browser. Don't 'require' anything.
}
else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
	// You're in ReactNative. Import things how you need to here.
	// @MobileDevs (don't edit the other imports).
	var soap = require('./soap');
}
else {
	// You're in NodeJS.
	var soap = require('./soap');
}
//-------------------------------------------------------------------------------
// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
//-------------------------------------------------------------------------------




var BASE_URL = "http://localhost:9000/api/"
// var BASE_URL = "http://localhost:8080/api/"
// var BASE_URL = "https://stratus-api-heroku.herokuapp.com/api/";




function endpoint(path) {
	return BASE_URL + path + "?wsdl";
}




api = {
	core: {
		auth: {
			signup: function(args, success, error) {
				soap(endpoint("core/auth"), "coreAuth", "signup", args, success, error);
			},
			signin: function(args, success, error) {
				soap(endpoint("core/auth"), "coreAuth", "signin", args, success, error);
			},
		},
		settings: {
			signup: function(args, success, error) {
				soap(endpoint("core/settings"), "coreSettings", "signup", args, success, error);
			},
			signin: function(args, success, error) {
				soap(endpoint("core/settings"), "coreSettings", "signin", args, success, error);
			},
		},
	},
}




//-------------------------------------------------------------------------------
// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
//-------------------------------------------------------------------------------
if (typeof document != 'undefined') {
	// You're in a web-browser. Don't 'module.exports' anything.
}
else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
	// You're in ReactNative. Import things how you need to here.
	// @MobileDevs (don't edit the other imports).
	module.exports = api; // is this what ReactNative needs? I don't know.
}
else {
	// You're in NodeJS.
	module.exports = api;
}
//-------------------------------------------------------------------------------
// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
//-------------------------------------------------------------------------------
