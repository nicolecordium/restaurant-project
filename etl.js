const etl = require('etl');
const request = require('request');
const { Pool } = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	// ssl: true
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
  // TODO: reduce the data set to the single most recent graded row
//   .pipe(etl.prescan(100, d => 
//     // build up headers from the first 10 lines
//     d.forEach(r => Object.keys(r).forEach(key => headers.add(key)))
//   ))
  // map the row into the data shape we will store
  .pipe(etl.map(d => {
		d.id = d.camis;
		d.name = d.dba;
		d.address = d.building + ' ' + d.street;
		d.cuisine = d.cuisine_description;

		return d;
  }))
  // collect 1000 records at a time for bulk-insert
//   .pipe(etl.collect(1000))
  // upsert records to postgres with max 10 concurrent server requests
  .pipe(etl.postgres.upsert(pool, 'public', 'restaurants', {concurrency:10}))
  // Switch from stream to promise chain and report done or error
  .promise()
  .then( () => console.log('done'), e => {
	  console.log('error',e);
	});