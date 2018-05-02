import { Component, OnInit } from '@angular/core';
import { RestaurantService, GeocodeService } from './services';
import { RestaurantRating, Marker } from './models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	restaurants: RestaurantRating[];

	mapCenter = { lat: 40.7127753, lng: -74.0059728 };
	mapBounds = {
		east: -73.70027209999999,
		north: 40.9175771,
		west: -74.25908989999999,
		south: 40.4773991
	};
	restaurantMarkers: Marker[] = [];

	constructor(private restaurantService: RestaurantService, private geocodeService: GeocodeService) { }

	ngOnInit() {

		this.restaurantService.query()
		.then((restaurants) => {
			this.restaurants = restaurants;
			this.restaurants.forEach((r: RestaurantRating) => {
				this.geocodeService.getMarker(r)
				.then((marker: Marker) => {
					this.restaurantMarkers.push(marker);
				});
			});
		});
	}
}
