# Stratus JS API Client

## QuickStart: 

If you are looking to use this API, make sure you check what platform you're on.

Besides the 2 dependencies, you only need `api.js` and `soap.js`. The other files are for unit testing.

## Purpose:

Moving the client over to SOAP.

This exists for 1) unit tests, and 2) to provide an API client for the mobile team.

The mobile team is not familiar with SOAP and is also building a ReactNative application.

ReactNative has no support for SOAP, so this client library uses two libraries to "Fake" SOAP calls. Both libraries are compatible with ReactNative:

`Axios`:	used for network calls (particularly POST requests)
`XMLDom`:	used for XML parsing of the SOAP response.

## Includes and Imports:

This API needs to be used in 3 separate places: 1) ReactNative, 2) Browser, 3) NodeJS.
Because of this, includes have to be managed very carfully. If you are changing imports
for the use of the API on your platform, *DO NOT CHANGE THE OTHER IMPORTS*.


All API files have imoprts and exports like the following:

	//-------------------------------------------------------------------------------
	// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
	//-------------------------------------------------------------------------------
	if (typeof document != 'undefined') {
		// If you are here, you are in the browser.
		// If you are on a browser, only change things you need here.
	}
	else if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
		// If you are here, you are in ReactNative.
		// If you are on ReactNative, only change things you need here.
	}
	else {
		// If you are here, you are in NodeJS (server side).
		// If you are on NodeJS, only change things you need here.
	}
	//-------------------------------------------------------------------------------
	// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
	//-------------------------------------------------------------------------------
