var request = require('request');

const getGeocodeLocation = function(address, boro, state, zipcode, callback) {
	var apiKey = process.env.GEOCODE_API_KEY;
	var address = encodeURI([address, boro, state].join(', ') + ' ' + zipcode);

	return request(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=us&key=${apiKey}`,
		(err, response, body) => {
			if (err) {
				console.log(err);
				return;
			}
			const parsedBody = JSON.parse(body);
			if (parsedBody.results && parsedBody.results.length) {
				var location = parsedBody.results[0].geometry.location;
				callback(location)
			}
		});
}

module.exports = {
	getGeocodeLocation
}
