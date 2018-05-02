import { Injectable } from '@angular/core';
import { RestaurantRating, Marker } from '../models';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class GeocodeService {
	constructor(private http: Http) {}

	getMarker(r: RestaurantRating): Promise<Marker> {
		const address = encodeURI([r.address, r.boro, 'NY'].join(', ') + ' ' + r.zipcode);

		return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + address
			+ `&apiKey=${environment.GOOGLE_MAPS_API_KEY}`)
			.toPromise()
			.then((response) => {
				const result = response.json().results[0].geometry.location;
				return {
					longitude: result.lat,
					latitude: result.lng,
					title: r.name
				};
			});
	}

	// getMarkers(restaurants: RestaurantRating[]): Promise<Marker[]> {
	// 	const addresses =

	// 	return addresses.map((a) => {

	// 	})
	// 	.forEach((response) => {
	// 		result.push(response.results[0].geometry.location);
	// 	})
	// 	.then;
	// }
}
