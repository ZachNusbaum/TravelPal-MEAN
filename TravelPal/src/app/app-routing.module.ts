import { PlaceDetailComponent } from './places/place-detail/place-detail.component';
import { PlacesPageComponent } from './places/places-page/places-page.component';
import { RideShareComparisonComponent } from './ride-share/ride-share-comparison/ride-share-comparison.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// This defines the different routes (URL paths) and maps them to a component.
// This tells angular which component to inject into the <router-outlet></router-outlet>.
const routes: Routes = [
  {path: '', component: HomepageComponent }, // Root Route (homepage)
  {path: 'ride_share', component: RideShareComparisonComponent },
  {path: 'places', component: PlacesPageComponent},
  {path: 'places/:id', component: PlaceDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
