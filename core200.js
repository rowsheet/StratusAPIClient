//-------------------------------------------------------------------------------
// THIS IS NOT AN API FILE. THIS IS MY UNIT TEST.
// @MobileDevs You only need to include 'api.js' and 'soap.js'.
// Don't change any other emports except the ones under 'ReactNative'!
//-------------------------------------------------------------------------------

var api = require('./api')
var fmt = require('./format')
var state = require('./state')

function _test(api, args) {
	console.log('\t' + api.name);
	fmt.request(fmt.json(args));
	api(args,fmt.response, fmt.response_err);
}

function line(label) {
	fmt.log('--------------------------------------------------------------------------------');
	console.log(label);
}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

function signup() {
	_test(api.core.auth.signup, {
		'username': 'akleinhans',
		'password': 'myverylongpassword',
	});
}

function signin() {
	_test(api.core.auth.signin, {
		'username': 'akleinhans',
		'password': 'myverylongpassword',
	});
}

function _signup() {
	_test(api.core.settings.signup, {
		'username': 'akleinhans',
		'password': 'myverylongpassword',
		'confirm_password': 'myverylongpassword_DIFFERENT',
		'email_address': 'test@gmail.com',
		'first_name': 'Alexander',
		'last_name': 'Kleinhans',
	});
}

function _signin() {
	_test(api.core.settings.signin, {
		'username': 'akleinhans',
		'password': 'myverylongpassword',
	});
}


// signup()
// signin()
// _signup()
// _signin()
new Promise(function(resolve, reject) {

	setTimeout(function() {
		resolve(state)
	}, 1000);

}).then(state =>  new Promise(function(resolve, reject) {
	line(fmt._log('core.auth.') + 'signup()');
	args = {
		'username': 'akleinhans',
		'password': 'myverylongpassword',
		'confirm_password': 'myverylongpassword',
		'email_address': 'test@gmail.com',
		'first_name': 'Alexander',
		'last_name': 'Kleinhans',
		'terms': true,
	}
	fmt.request(args)
	api.core.auth.signup(args,
	function(resp) {
		fmt.response(resp);
		resolve(state);
	},function(err) {
		fmt.ERROR('signup');
		fmt.response_err(err);
		reject(err);
	});
})).then(state =>  new Promise(function(resolve, reject) {
	line('signin');
	fmt.log(fmt.json(state));
	args = {
		'username': 'akleinhans',
		'password': 'myverylongpassword',
	}
	fmt.request(args)
	api.core.auth.signin(args,
	function(resp) {
		fmt.response(resp);
		// update state
		state.sessionKey = resp.sessionKey;
		state.username = args['username'];
		// next step
		resolve(state);
	},function(err) {
		fmt.ERROR('signin');
		fmt.response_err(err);
		reject(state);
	});
})).then(state =>  new Promise(function(resolve, reject) {
	line('idk')
	fmt.log(fmt.json(state));

	console.log(result);
	return result * 2;

})).then(function(result) {

	console.log(result);
	return result * 2;

}).catch(function(err) {

	fmt.error(err);

});
