const server = require('./api/server.js');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`=== Server listening on port ${PORT} ===`);
	return "<h1>Hello World</h1>"
});
