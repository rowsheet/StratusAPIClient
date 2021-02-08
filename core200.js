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

function _signup() {
	_test(api.core.settings.signup, {
		"username": "akleinhans",
		"password": "myverylongpassword",
		"confirm_password": "myverylongpassword_DIFFERENT",
		"email_address": "test@gmail.com",
		"first_name": "Alexander",
		"last_name": "Kleinhans",
	});
}

function _signin() {
	_test(api.core.settings.signin, {
		"username": "akleinhans",
		"password": "myverylongpassword",
	});
}

console.log('\n');
// signup()
// signin()
// _signup()
_signin()
