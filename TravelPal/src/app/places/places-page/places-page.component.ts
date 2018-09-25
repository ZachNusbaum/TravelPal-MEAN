import { ReverseGeocodeService } from './../../reverse-geocode.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-places-page',
  templateUrl: './places-page.component.html',
  styleUrls: ['./places-page.component.css']
})
export class PlacesPageComponent implements OnInit {
  // This assigns the search form to a variable that can be used to change the value of its inputs.
  @ViewChild(SearchFormComponent) searchForm: SearchFormComponent;
  userAddress: string;

  constructor(private rg: ReverseGeocodeService) { }

  ngOnInit(): void | boolean {
    // Get the user's geolocation
    this.getLocation();
  }

  getLocation(): void | boolean {
    // If there is an existing address in localStorage, don't reverse geocode.
    if (localStorage.getItem('start')) { return true; }
    // If the geolocation is available
    if ('geolocation' in navigator) {
      // Get the coords from navigator and pass it to the Google API.
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.rg.reverseGeocode({lat: position.coords.latitude, lng: position.coords.longitude}).subscribe((response: any) => {
          console.log(response);
          this.userAddress = response.results[0].formatted_address;
          // This changes the value of the 'address' input. searchForm is a reference to the DOM.
          this.searchForm.model.address = this.userAddress;
        });
      });
    } else {
      console.log('Geolocation not available');
    }
  }

}
