# Stratus JS API Client

Moving the client over to SOAP.

This exists for 1) unit tests, and 2) to provide an API client for the mobile team.

The mobile team is not familiar with SOAP and is also building a ReactNative application.

ReactNative has no support for SOAP, so this client library uses two libraries to "Fake" SOAP calls. Both libraries are compatible with ReactNative:

Axios:	used for network calls (particularly POST requests)
XMLDom:	used for XML parsing of the SOAP response.
