//-------------------------------------------------------------------------------
// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
//-------------------------------------------------------------------------------
// DO NOT CHANGE ANYTHING ABOUT THIS DOM PARSER.
var _DOMParser;
if (typeof document != 'undefined') {
	// You're in a web-browser. Don't 'require' anything.
	// We can't use 'var' in any conditional in any scenario or Javascript
	// will say it's already been defined.
	_DOMParser = DOMParser;
}
else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
	// You're in ReactNative. Import things how you need to here.
	// @MobileDevs (don't edit the other imports).
	var axios = require('axios');
	let { DOMParser } = require('xmldom')
}
else {
	// You're in NodeJS.
	var axios = require('axios');
	if (typeof DOMParser !== 'undefined') {
		// It's been defined already in the browser include.
	} else {
		// We can't user 'var' because Javascript will hoist and say
		// it has global scope. We can't use 'const' because it only
		// goes past this conditional.
		let { DOMParser } = require('xmldom')
		_DOMParser = DOMParser;
	}
}
//-------------------------------------------------------------------------------
// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
//-------------------------------------------------------------------------------



//------------------------------------------------------------------------------
// This is a very hack solution to create an XML header for a SOAP request using
// libraries that are compatiable accross browsers, nodejs, and react-native.
// There is no SOAP api that does this (accross all of those). Please don't
// change and try to make improvements to this and just leave it be. It works.
//------------------------------------------------------------------------------

// Fetch the actual dom parser here, weather it was set from the browser or
// a library import. This one is the only one that's allowed to user 'var'.
// We can't just use DOMParser itself because they're two ways it can be imported.
DOMParser = _DOMParser;

function build_tag(label, value) {
	if (value == null) {
		value = '';
	}
	var tag = '<' + label + '>' + value + '</' + label + '>'
	return tag;
}

function build_args(args) {
	sum = '';
	for (var key of Object.keys(args)) {
		sum += build_tag(key, args[key]);
	}
	return sum;
}

function build_xml(namespace, method, args) {
	var string ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://' + namespace + '.com/"><soapenv:Header/><soapenv:Body>' + wrap_method(method, args) + '</soapenv:Body></soapenv:Envelope>';
	return string;
}

function wrap_method(method, args) {
	return '<web:' + method + '>' + build_args(args) + '</web:' + method + '>';
}

function reformat(resp) {
	var _debug = {
		status_code: null,
		message: null,
		errors: null,
	}
	if (resp.http_status_code) {
		_debug.status_code = resp.http_status_code;
	}
	if (resp.message) {
		_debug.message = resp.message;
	}
	if (resp.errors) {
		_debug.errors = resp.errors;
	}
	delete resp.http_status_code;
	delete resp.message;
	delete resp.errors;
	resp._debug = _debug;
	return resp;
}

function soap(url, namespace, method, args, success, error) {
	var xmls = build_xml(namespace, method, args);
	axios.post(url,xmls,
		{headers:
			{'Content-Type': 'text/xml'}
		}).then(res=>{
			var doc = new DOMParser().parseFromString(res.data);
			var data = doc.getElementsByTagName("return")[0].childNodes[0].data;
			json = JSON.parse(data)
			if (json.http_status_code != 200) {
				throw json;
			}
			if (typeof success != 'function') {
				console.log("WARNING: An successful API call was made, but no callback function was passed.");
				console.error("url: " + url);
				console.error("method: " + method);
				console.error("response: " + json);
			}
			json = reformat(json);
			success(json);
		}).catch(err=>{
			if (typeof success != 'error') {
				console.error("WARNING: A failed API call was made, but no error function was passed.");
				console.error("url: " + url);
				console.error("method: " + method);
				console.error("err: " + err);
			}
			err = reformat(err);
			error(err);
		});
}



//-------------------------------------------------------------------------------
// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
//-------------------------------------------------------------------------------
if (typeof document != 'undefined') {
	// You're in a web-browser. Don't 'require' anything.
}
else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
	// You're in ReactNative. Import things how you need to here.
	// @MobileDevs (don't edit the other imports).
	module.exports = soap;
}
else {
	// You're in NodeJS.
	module.exports = soap;
}
//-------------------------------------------------------------------------------
// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
//-------------------------------------------------------------------------------





// SOME TESTING. DON'T DELETE THIS IN CASE I NEED TO TEST STUFF LATER
//
// url = endpoint('core/auth');
// namespace = 'coreAuth';
// method = 'signin';
// args = {
// 	"username": "akleinhans",
// 	"password": null,
// 	"username": "akleinhans",
// 	"password": "myverylongpassword",
// 	"confirm_password": "myverylongpassword_DIFFERENT",
// 	"email_address": "test@gmail.com",
// 	"first_name": "Alexander",
// 	"last_name": "Kleinhans",
// }
// 
// 
// console.log(build_tag('username', 'USERNAME'));
// console.log(build_args(args));
// console.log(wrap_method(method, args));
// console.log(build_xml(namespace, method, args));
// console.log(soap(url, namespace, method, args, function(resp) {
// 	console.log('success');
// 	console.log(resp);
// }, function(err) {
// 	console.log('error');
// 	console.log(err);
// }));

