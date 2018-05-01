import { RestaurantRating } from '../../app/models';
import { environment } from '../../environments/environment';
import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

export class RestaurantService {
	db: IMain;
	constructor() {
		this.db = pgPromise(environment.databaseConnection);
	}

	query(minimumGrade: string, cuisine: string): Promise<RestaurantRating[]> {
		return this.db.many('SELECT * FROM restaurants WHERE grade >= ${minGrade} AND cuisine = ${cuisine}', {
			minGrade: minimumGrade,
			cuisine: cuisine
		});
	}
}
