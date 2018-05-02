var request = require('request');

const getGeocodeLocation = function(address, boro, state, zipcode) {
	var apiKey = process.env.GEOCODE_API_KEY;
	var address = encodeURI([address, boro, state].join(', ') + ' ' + zipcode);

	return request
	.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=us&key=${apiKey}`)
	.pipe((response) => {
		console.log(response);
		return response.results[0].geometry.location;
	});
}

module.exports = {
	getGeocodeLocation
}
