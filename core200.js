//-------------------------------------------------------------------------------
// THIS IS NOT AN API FILE. THIS IS MY UNIT TEST.
// @MobileDevs You only need to include 'api.js' and 'soap.js'.
// Don't change any other emports except the ones under 'ReactNative'!
//-------------------------------------------------------------------------------

var api = require('./api')
var fmt = require('./format')

function _test(api, args) {
	console.log('\t' + api.name);
	fmt.request(fmt.json(args));
	api(args,fmt.response, fmt.response_err);
}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

function signup() {
	_test(api.core.auth.signup, {
		"username": "akleinhans",
		"password": "myverylongpassword",
		"confirm_password": "myverylongpassword",
		"email_address": "test@gmail.com",
		"first_name": "Alexander",
		"last_name": "Kleinhans",
		"terms": true,
	});
}

function signin() {
	_test(api.core.auth.signin, {
		"username": "akleinhans",
		"password": "myverylongpassword",
	});
}

// signup()
signin()

