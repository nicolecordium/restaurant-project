# RestaurantProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## ETL and schema
Here is the schema for the `restaurants` table:
- `id` (bigint, primary key): Unique identifier for the restaurant (source: DOHMH New York City Restaurant Inspection Results)
- `name` (text): name of the restaurant (source: DOHMH New York City Restaurant Inspection Results)
- `address` (text): address of the restaurant (source: DOHMH New York City Restaurant Inspection Results)
- `boro` (text): boro of the restaurant (source: DOHMH New York City Restaurant Inspection Results)
- `zipcode` (number): zipcode of the restaurant (source: DOHMH New York City Restaurant Inspection Results)
- `grade` (char(1)): most recent grade received by the restaurant (source: DOHMH New York City Restaurant Inspection Results)

## Running locally
1. Install postgres v 10 or greater with schema `public`
2. Obtain a Google Geocode API Key from https://developers.google.com/maps/documentation/geocoding/intro
3. Create a .env file in the root folder with the following configs: `DATABASE_URL={{ local postgres connection string }}` and `GEOCODE_API_KEY={{ your api key }}` 
4. Obtain an API for the client-side Google Maps Javascript API here: https://developers.google.com/maps/documentation/javascript/ and add it to both environment files in `src/environments/` as `GOOGLE_MAPS_API_KEY={{ your api key }}`
5. Install dependencies and build the Angular application: `yarn` or `npm install`
6. Run `npm run start:etl` to create the data table and load data
7. Run the web application: `npm run start`
8. Access the web application at `localhost:5000`