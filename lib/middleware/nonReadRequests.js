/**
 * Creates and returns the middleware to handle non read requests.
 *
 * Handles non read requests (POST, PUT, DELETE...) and returns an error 404,
 * because those operations aren't supported by the server.
 *
 * @module server/middleware/nonReadRequests
 * @returns {function} Returns a server middleware closure.
 */
function createMiddleware() {
	return function nonReadRequests(req, res, next) {
		// Handle anything but read operations *before* the serveIndex middleware
		//	as it will reject them with a 405 (Method not allowed) instead of 404 like our old tooling
		if (req.method !== "GET" && req.method !== "HEAD" && req.method !== "OPTIONS") {
			res.status(404).end(`Cannot ${req.method} ${req.path}`);
		} else {
			next();
		}
	};
}

module.exports = createMiddleware;
