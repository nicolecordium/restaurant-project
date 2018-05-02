import { Injectable } from '@angular/core';
import { RestaurantRating } from '../../app/models';
import { Http, Response } from '@angular/http';

@Injectable()
export class RestaurantService {
	private restaurantApiUrl = '/api/restaurant';
	constructor(private http: Http) { }

	query(): Promise<RestaurantRating[]> {
		return this.http.get(this.restaurantApiUrl)
			.toPromise()
			.then(response => response.json() as RestaurantRating[])
			.then((ratings => ratings.sort(this.restaurantSorter).slice(0, 10)));
	}

	private restaurantSorter(a: RestaurantRating, b: RestaurantRating): number {
		if (a.grade < b.grade) {
			return -1;
		} else if (a.grade > b.grade) {
			return 1;
		}

		return 0;
	}
}
