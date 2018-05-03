import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './services';
import { MarkerViewModel } from './models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Best Thai Restaurants in NYC';
	markers: MarkerViewModel[] = [];

	// Hardcoding NYC coords
	mapCenter = { lat: 40.7127753, lng: -74.0059728 };
	mapBounds = {
		east: -73.70027209999999,
		north: 40.9175771,
		west: -74.25908989999999,
		south: 40.4773991
	};

	constructor(private restaurantService: RestaurantService) { }

	ngOnInit() {
		this.restaurantService.getRestaurants()
		.then((restaurants) => {
			restaurants.forEach((restaurant) => {
				this.restaurantService.getMarker(restaurant)
					.then((marker) => {
						this.markers.push({
							marker: marker,
							restaurant: restaurant
						});
					});
			});
		});
	}
}
