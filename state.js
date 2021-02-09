var state = {
	sessionKey: null,
	jwt: {},
	authenticated: false,
	notifications: {
		circle: 0,
		profile: 0,
		friends: 0,
		messages: 0,
		memories: 0,
		pages: 0,
		groups: 0,
		events: 0,
		explore: 0,
		atrium: 0,
		blogs_hub: 0,
		ads_hub: 0,
		market_hub: 0,
		wallet: 0,
	},
	chat: {},
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
	module.exports = state; // is this what ReactNative needs? I don't know.
}
else {
	// You're in NodeJS.
	module.exports = state;
}
//-------------------------------------------------------------------------------
// CORS-PLATFORM IMPORTS. ONLY CHANGE THE IMORTS THAT BELONG TO YOUR PLATOFRM!!!!
//-------------------------------------------------------------------------------
