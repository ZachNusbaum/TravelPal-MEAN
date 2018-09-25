import { LatLng } from './../../lat-lng';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReverseGeocodeService } from './../../reverse-geocode.service';
import { RideShareFormComponent } from '../ride-share-form/ride-share-form.component';

@Component({
  selector: 'app-ride-share-comparison',
  templateUrl: './ride-share-comparison.component.html',
  styleUrls: ['./ride-share-comparison.component.css']
})
export class RideShareComparisonComponent implements OnInit {
  // Indicates that both Uber and Lyft prices are ready.
  pricesReady: boolean;
  // The user's reverse-geocoded address.
  userAddress: string;
  // variable rideShareForm references the actual HTML form.
  @ViewChild(RideShareFormComponent) rideShareForm: RideShareFormComponent;

  constructor(private rg: ReverseGeocodeService) { }

  // ngOnInit() runs every time the component loads.
  ngOnInit(): void | boolean {
    this.getCurrentPosition();
  }

  // Get the user's current posiiton
  getCurrentPosition(): void | boolean {
    // If a start address already exists in localStorage, don't run the rest of the function.
    if (localStorage.getItem('start')) { return true; }
    // if geolocation is available...
    if ('geolocation' in navigator) {
      // Get the current position from the navigator.
      navigator.geolocation.getCurrentPosition((position: any) => {
        // Send the coordinates from the navigator to the google reverse geocode api...
        this.rg.reverseGeocode({lat: position.coords.latitude, lng: position.coords.longitude}).subscribe((response: any) => {
          this.userAddress = response.results[0].formatted_address;
          // Assign the reverse-geocoded address as the value of the form input...
          this.rideShareForm.model.start_address = this.userAddress;
        });
      });
    } else {
      console.log('Geolocation not available');
    }
  }

}
