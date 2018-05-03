export class Marker {
	latitude: number;
	longitude: number;
	title: string;

	constructor (json: any) {
		this.title = json.title;
		this.latitude = Number.parseFloat(json.latitude);
		this.longitude = Number.parseFloat(json.longitude);
	}
}
