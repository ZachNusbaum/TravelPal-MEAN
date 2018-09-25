import { PipesModule } from './pipes/pipes.module';
import { RideShareModule } from './ride-share/ride-share.module';
import { PlacesModule } from './places/places.module';
import { GeocodingService } from './geocoding.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core'; // Angular Google Maps (Source: https://angular-maps.com/)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UberService } from './uber.service';
import { SecondsPipe } from './seconds.pipe';

// This is the root module for the entire app.
// You must declare all components and other modules that you wish to use
// before they can be used.

@NgModule({
  declarations: [
    AppComponent, // The root component for the app
    MenuBarComponent, // The bootstrap menubar
    HomepageComponent, // The homepage
  ],
  imports: [
    BrowserModule, // Required. Imported by default.
    AppRoutingModule, // Import the routes (see ./src/app/app-routing.module.ts)
    FormsModule, // Provides angular form validations, and other methods for forms.
    HttpClientModule, // Used for connecting to the various APIs
    PlacesModule, // The module that contains the components for the Places feature.
    AgmCoreModule.forRoot({ // Angular components for displaying Google Maps.
      apiKey: 'AIzaSyAUS_9LDubZs79TSZQ0jsyghykkpscT5pk'
    }),
    RideShareModule, // The moduel that contains the components for the ride share feature.
    PipesModule.forRoot() // Module that exports the custom pipes I define.
  ],
  providers: [GeocodingService, UberService, SecondsPipe],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
