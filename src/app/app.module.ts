import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RestaurantService } from './services';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule
	],
	providers: [
		RestaurantService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
