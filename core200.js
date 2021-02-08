var api = require('./api')
var fmt = require('./format')

function signup() {
	api.core.auth.signup({
		"username": "akleinhans",
		"password": "myverylongpassword",
		"confirm_password": "myverylongpassword_DIFFERENT",
		"email_address": "test@gmail.com",
		"first_name": "Alexander",
		"last_name": "Kleinhans",
	},fmt.callback)
}

function signin() {
	api.core.auth.signin({
		"username": "akleinhans",
		"password": "myverylongpassword",
	},fmt.callback)
}

function _signup() {
	api.core.settings.signup({
		"username": "akleinhans",
		"password": "myverylongpassword",
		"confirm_password": "myverylongpassword_DIFFERENT",
		"email_address": "test@gmail.com",
		"first_name": "Alexander",
		"last_name": "Kleinhans",
	},fmt.callback)
}

function _signin() {
	api.core.settings.signin({
		"username": "akleinhans",
		"password": "myverylongpassword",
	},fmt.callback)
}

// signup()
// signin()
_signup()
_signin()
