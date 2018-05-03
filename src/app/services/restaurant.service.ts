import { Injectable } from '@angular/core';
import { Restaurant, Marker } from '../../app/models';
import { Http, Response } from '@angular/http';

@Injectable()
export class RestaurantService {
	private restaurantApiUrl = '/api/restaurant';
	private markersApiUrl = '/api/markers';
	constructor(private http: Http) { }

	getRestaurants(): Promise<Restaurant[]> {
		return this.http.get(this.restaurantApiUrl)
			.toPromise()
			.then(response => response.json().map((r) => new Restaurant(r)))
			.then((ratings => ratings
				.sort(this.restaurantSorter)
				.slice(0, 10)));
	}

	getMarker(restaurant: Restaurant): Promise<Marker> {
		const address = encodeURI([restaurant.address, restaurant.boro, 'NY'].join(', ') + ' ' + restaurant.zipcode);

		return this.http.get(this.markersApiUrl + `?address=${address}`)
			.toPromise()
			.then(response => {
				const location = response.json();
				return new Marker({
					...location,
					title: restaurant.name
				});
			});
	}

	private restaurantSorter(a: Restaurant, b: Restaurant): number {
		if (a.grade < b.grade) {
			return -1;
		} else if (a.grade > b.grade) {
			return 1;
		}

		return 0;
	}
}
