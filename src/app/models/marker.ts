export class Marker {
	latitude: number;
	longitude: number;

	constructor (json: any) {
		this.latitude = Number.parseFloat(json.latitude);
		this.longitude = Number.parseFloat(json.longitude);
	}
}
