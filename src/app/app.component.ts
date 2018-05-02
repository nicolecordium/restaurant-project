import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './services';
import { RestaurantRating } from './models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	restaurants: RestaurantRating[];

	constructor(private restaurantService: RestaurantService) {}

	ngOnInit() {

		this.restaurantService.query('A', 'Thai').then((result) => {
			this.restaurants = result;
		});
	}
}
