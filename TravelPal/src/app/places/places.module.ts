import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './../app-routing.module';
import { GooglePlacesService } from './../google-places.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form/search-form.component';
import { PlacesPageComponent } from './places-page/places-page.component';
import { ListComponent } from './list/list.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { HotTableModule } from '@handsontable-pro/angular';

@NgModule({
  imports: [
    CommonModule, // Required.
    FormsModule, // Form validations and other form methods.
    AppRoutingModule, // Required because this module needs access to the URL params.
    AgmCoreModule.forRoot({ // Angular components for displaying Google Maps.
      apiKey: 'AIzaSyAUS_9LDubZs79TSZQ0jsyghykkpscT5pk'
    }),
    HotTableModule // External library for displaying data as a table. (not used)
  ],
  // Declare the components to be used within the module.
  declarations: [SearchFormComponent, PlacesPageComponent, ListComponent, PlaceDetailComponent],
  providers: [GooglePlacesService], // List any dependencies (services) to be injected.
  exports: [] // List any components to be exported. (Exported components can be used from outside the module)
})
export class PlacesModule { }
