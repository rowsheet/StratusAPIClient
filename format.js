//-------------------------------------------------------------------------------
// THIS IS NOT AN API FILE. THIS IS MY UNIT TEST.
// @MobileDevs You only need to include 'api.js' and 'soap.js'.
// Don't change any other emports except the ones under 'ReactNative'!
//-------------------------------------------------------------------------------
function _log(string) {
	return '\x1b[0m\x1b[2m' + string + '\x1b[0m';
}
function log(string) {
	console.log(_log(string));
}
function INFO(string) {
	console.log('\x1b[46m%s\x1b[0m', string);
}
function _info(string) {
	return '\x1b[0m\x1b[36m' + string + '\x1b[0m';
}
function info(string) {
	console.log(_info(string));
}
function ERROR(string) {
	console.log('\x1b[41mERROR: %s\x1b[0m', string);
}
function _error(string) {
	return '\x1b[31m' + string + '\x1b[0m';
}
function error(string) {
	console.log(_error(string));
}
function WARNING(string) {
	console.log('\x1b[43mWARNING: %s\x1b[0m', string);
}
function _warning(string) {
	return '\x1b[33m' + string + '\x1b[0m';
}
function warning(string) {
	console.log(_warning(string));
}
function SUCCESS(string) {
	console.log('\x1b[42mSUCCESS: %s\x1b[0m', string);
}
function _success(string) {
	return '\x1b[32m' + string + '\x1b[0m';
}
function success(string) {
	console.log(_success(string));
}

function request(string) {
	info('\t' + json(string).replace(/\n/g,'\n\t'));
}
function response(string) {
	success('\t' + json(string).replace(/\n/g,'\n\t'));
}
function response_err(string) {
	error('\t' + json(string).replace(/\n/g,'\n\t'));
}

function json(data) {
	try {
		return JSON.stringify(JSON.parse(data), null, 4);
	} catch {
		return JSON.stringify(data, null, 4);
	}
}
function demo() {
	request('some\nmulti-line\nrequest\ndata');
	response('some\nmulti-line\nresponse\ndata');
	log('log');
	info('info');
	INFO('INFO');
	success('success');
	SUCCESS('SUCCESS');
	warning('warning');
	WARNING('WARNING');
	error('error');
	ERROR('ERROR');
}
module.exports = {
	// test formatting colors
	demo: demo,
	// formatting
	json: json,
	request: request,
	response: response,
	response_err: response_err,
	log: log,
	_log: _log,
	info: info,
	_info: _info,
	INFO: INFO,
	success: success,
	_success: _success,
	SUCCESS: SUCCESS,
	warning: warning,
	_warning: _warning,
	WARNING: WARNING,
	error: error,
	_error: _error,
	ERROR: ERROR,
}
//-------------------------------------------------------------------------------
// THIS IS NOT AN API FILE. THIS IS MY UNIT TEST.
// @MobileDevs You only need to include 'api.js' and 'soap.js'.
// Don't change any other emports except the ones under 'ReactNative'!
//-------------------------------------------------------------------------------
