const axios = require('axios');
const { DOMParser } = require('xmldom')

//------------------------------------------------------------------------------
// This is a very hack solution to create an XML header for a SOAP request using
// libraries that are compatiable accross browsers, nodejs, and react-native.
// There is no SOAP api that does this (accross all of those). Please don't
// change and try to make improvements to this and just leave it be. It works.
//------------------------------------------------------------------------------

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

function call_api(url, namespace, method, args, success, error) {
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
			try {
				json = reformat(json);
				success(json);
			} catch {
				console.log("WARNING: An successful API call was made, but no callback function was passed.");
				console.error("url: " + url);
				console.error("method: " + method);
				console.error("response: " + json);
			}
		}).catch(err=>{
			if (error == undefined) {
				console.error("WARNING: A failed API call was made, but no error function was passed.");
				console.error("url: " + url);
				console.error("method: " + method);
				console.error("err: " + err);
			} else {
				err = reformat(err);
				error(err);
			}
		});
}

module.exports = {
	call_api: call_api,
}

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
// console.log(call_api(url, namespace, method, args, function(resp) {
// 	console.log('success');
// 	console.log(resp);
// }, function(err) {
// 	console.log('error');
// 	console.log(err);
// }));
