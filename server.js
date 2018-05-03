var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var { Pool } = require('pg');

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

// Connect to the database before starting the application server.
pool.connect().then((client) => {
	// Save database object from the callback for reuse.
	//   pool = client.db();
	console.log("Database connection ready");

	// Initialize the app.
	var server = app.listen(process.env.PORT || 8080, function () {
		var port = server.address().port;
		console.log("App now running on port", port);
	});
	client.release();
}, (err) => {
	console.log(err);
	process.exit(1);
});

// API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({ "error": message });
}

// api/restaurant endpoint
app.get('/api/restaurant', function (req, res, next) {
	return pool.connect().then((client) => {
		return client.query('SELECT * FROM public.restaurants')
			.then((queryResult) => {
				if (queryResult && queryResult.rows) {
					return res.status(200).json(queryResult.rows);
				}
			})
			.catch((err) => {
				return handleError(res, err).json();
			})
			.then(() => client.release());
	}, (err) => {
		return handleError(res, err).json();
	});
});

// api/marker endpoint
app.get('/api/marker', function (req, res, next) {
	if (!req.query || !req.query.address) {
		return handleError(res, 'Address argument is required').json();
	}
	var address = req.query.address;
	var apiKey = process.env.GEOCODE_API_KEY;

	return request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=us&key=${apiKey}`,
		function (err, response, body) {
			if (err) {
				return handleError(res, err, err).json();
			}
			const parsedBody = JSON.parse(body);
			if (parsedBody.results && parsedBody.results.length) {
				var location = parsedBody.results[0].geometry.location;
				return res.status(200).json({
					latitude: location.lat,
					longitude: location.lng
				});
			}

			// another response was returned, return it for debugging purposes
			return res.status(200).json(parsedBody);
		});
});
