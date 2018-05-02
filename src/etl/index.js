const etl = require('etl');
const request = require('request');
const { Pool } = require('pg');
const dbService = require('./services/database.service');
const geocodeService = require('./services/geocode.service');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});
let restaurantGradeCache = {};

// create the data table if doesn't already exist
pool.connect().then((poolClient) => {
	dbService.createTable(poolClient).catch((err) => {
		console.log(err);
	})
.then(poolClient.release());
}).then(() => {
	request('https://nycopendata.socrata.com/api/views/xx67-kt59/rows.csv?accessType=DOWNLOAD')
		// parse the csv file
		.pipe(etl.csv({
			sanitize: true,
			transform: {
				grade_date: function (dateString) {
					if (dateString) {
						return new Date(dateString);
					}
				}
			}
		})
		)
		.pipe(etl.map(d => {
			// remove rows with no grade, rows that are not thai restaurants,
			// rows whose grade is lower than 'B',
			// or rows that are older than ones we read before
			if ((!d.grade) || (d.grade > 'B') ||
			(d.cuisine_description.toLowerCase().indexOf('thai') === -1) ||
			((restaurantGradeCache[d.camis] &&
				restaurantGradeCache[d.camis] > d.grade_date))) {
				return;
			} else {
				// cache the grade date of the rows we allow through
				restaurantGradeCache[d.camis] = d.grade_date;
				return d;
			}
		}))
		// obtain geocode values and map the row into the data shape we will store
		.pipe(() => {
			d.id = d.camis;
			d.name = d.dba;
			d.address = d.building + ' ' + d.street;
			var location = geocodeService.getGeocodeLocation(d.address, d.boro, 'NY', d.zipcode);
			d.lat = location.lat;
			d.lng = location.lng;

			return d;
		})
		// upsert records to postgres with max 10 concurrent server requests-
		// due to primary key newer rows for the same restaurant id will update older ones
		.pipe(etl.postgres.upsert(pool, 'public', 'restaurants', { concurrency: 10 }))
		// Switch from stream to promise chain and report done or error
		.promise()
		.then(() => console.log('done'), e => {
			console.log('error', e);
		})
		.finally(() => {
			restaurantGradeCache = null;
		});
});
