import { Injectable } from '@angular/core';
import { RestaurantRating } from '../../app/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestaurantService {
	constructor(private http: HttpClient) {}

	query(minimumGrade: string, cuisine: string): any {
		return this.http.get(`/restaurant?minGrade=${minimumGrade}&cuisine=${cuisine}`);
	}
}
