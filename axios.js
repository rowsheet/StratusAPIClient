const axios = require('axios');
const { DOMParser } = require('xmldom')

function build_tag(label, value) {
	return '<web:' + label + '>' + value + '</web:' + label + '>'
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

function call_api(url, namespace, method, args, success, error) {
	var xmls = build_xml(namespace, method, args);
	axios.post(url,xmls,
		   {headers:
		     {'Content-Type': 'text/xml'}
		   }).then(res=>{
			   var doc = new DOMParser().parseFromString(res.data);
			   var json = doc.getElementsByTagName("return")[0].childNodes[0].data;
			   success(json);
		   }).catch(err=>{
			   error(err);
		   });
}

var BASE_URL = 'https://stratus-api-heroku.herokuapp.com/api/';
function endpoint(path) {
	return BASE_URL + path + "?wsdl";
}

url = endpoint('core/auth');
namespace = 'coreAuth';
method = 'signin';
args = {
	"username": "akleinhans",
	"password": "myverylongpassword",
}



// console.log(build_tag('username', 'USERNAME'));
// console.log(build_args(args));
// console.log(wrap_method(method, args));
// console.log(build_xml(namespace, method, args));
console.log(call_api(url, namespace, method, args, function(resp) {
	console.log('success');
	console.log(resp);
}, function(err) {
	console.log('error');
	console.log(err);
}));
