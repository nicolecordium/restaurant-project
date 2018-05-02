//Install express server
const express = require('express');
const path = require('path');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var api = require('./routes/api.route')

const app = express();

// configuration =================
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(api); // API routes

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('App is listening on port 8080');
