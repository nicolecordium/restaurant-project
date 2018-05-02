var express = require('express');
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
	res.status(code || 500).json({"error": message});
  }
  
app.get('/api/restaurant', function(req, res, next){
	if ((req.query.minGrade) && (req.query.cuisine)) {
		const minGrade = req.query.minGrade;
		const cuisine = req.query.cuisine;
		return pool.connect().then((client) => {
			return client.query({
				text: 'SELECT * FROM public.restaurants WHERE GRADE <= $1::text AND CUISINE ~* $2::text',
				values: [minGrade, cuisine],
			}).then((queryResult) => {
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
	} else {
		return handleError(res, 'Invalid request', 'minGrade and cuisine arguments are required.').json();
	}
});
