import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { RestaurantService } from './services';
import { environment } from '../environments/environment.prod';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		AgmCoreModule.forRoot({
			apiKey: environment.GOOGLE_MAPS_API_KEY
		})
	],
	providers: [
		RestaurantService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
