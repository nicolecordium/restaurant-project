export class Restaurant {
	id: number;
	name: string;
	address: string;
	boro: string;
	zipcode: number;
	cuisine: string;
	grade: string;
	latitude: number;
	longitude: number;

	constructor (json: any) {
		this.id = json.id;
		this.name = json.name;
		this.address = json.address;
		this.boro = json.boro;
		this.zipcode = json.zipcode;
		this.grade = json.grade;
		this.latitude = Number.parseFloat(json.latitude);
		this.longitude = Number.parseFloat(json.longitude);
	}
}
