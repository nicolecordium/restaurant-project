const etl = require('etl');
const request = require('request');
const { Pool } = require('pg');
const dbService = require('./db/database.service');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	// ssl: true
});
let restaurantGradeCache = {};

// create the data table if doesn't already exist
pool.connect().then((poolClient) => {
	dbService.createTable(poolClient).then(poolClient.release());
});

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
	// remove rows with no grade, or rows that are older than ones we read before
	if ((!d.grade) || ((restaurantGradeCache[d.camis] && 
		restaurantGradeCache[d.camis] > d.grade_date))) {
			return;
	} else {
		// cache the grade date of the rows we allow through
		restaurantGradeCache[d.camis] = d.grade_date;
		return d;
	}
}))
  // map the row into the data shape we will store
  .pipe(etl.map(d => {
		d.id = d.camis;
		d.name = d.dba;
		d.address = d.building + ' ' + d.street;
		d.cuisine = d.cuisine_description;

		return d;
  }))
  // upsert records to postgres with max 10 concurrent server requests-
  // due to primary key newer rows for the same restaurant id will update older ones
  .pipe(etl.postgres.upsert(pool, 'public', 'restaurants', {concurrency:10}))
  // Switch from stream to promise chain and report done or error
  .promise()
  .then(() => console.log('done'), e => {
	  console.log('error',e);
	})
	.finally(() => {
		restaurantGradeCache = null;
	});