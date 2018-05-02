# RestaurantProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## ETL and schema
- The schema selected for the `restaurants` table

## Running locally
- Install postgres v 10 or greater with schema `public`
- Create a .env file in the root folder with the following configs: `DATABASE_URL={{ local postgres connection string }}`
- Install dependencies and build the Angular application: `yarn`
- Run `npm run start:etl` to create the data table and load data
- Run the web application: `npm run start`
- Access the web application at `localhost:5000`