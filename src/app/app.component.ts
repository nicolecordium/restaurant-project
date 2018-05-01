import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app';
	restaurantService: RestaurantService;

	ngOnInit() {
		this.restaurantService = new RestaurantService();

		const restaurants = this.restaurantService.query('A', 'Thai');
	}
}
