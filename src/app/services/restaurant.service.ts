import { Injectable } from '@angular/core';
import { Restaurant } from '../../app/models';
import { Http, Response } from '@angular/http';

@Injectable()
export class RestaurantService {
	private restaurantApiUrl = '/api/restaurant';
	constructor(private http: Http) { }

	query(): Promise<Restaurant[]> {
		return this.http.get(this.restaurantApiUrl)
			.toPromise()
			.then(response => response.json().map((r) => new Restaurant(r)))
			.then((ratings => ratings
				.filter((r) => (r.latitude && r.longitude))
				.sort(this.restaurantSorter)
				.slice(0, 10)));
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
