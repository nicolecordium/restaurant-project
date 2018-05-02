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
			.then(response => response.json() as RestaurantRating[]);
	}
}
