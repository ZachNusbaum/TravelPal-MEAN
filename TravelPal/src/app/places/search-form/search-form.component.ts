import { GooglePlacesService } from './../../google-places.service';
import { GeocodingService } from './../../geocoding.service';
import { PlacesQuery } from './places-query';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-places-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  model: PlacesQuery = new PlacesQuery(''); // Object has methods for each form field
  results: any = null; // Search results.
  submitted: boolean; // Has the form been submitted?
  finished: boolean; // Are all requests finished?

  // The options for the select-one dropdown on the Places page
  // are populated from this array.
  place_types = [
    {name: 'Point of Interest (general)', value: 'point_of_interest'},
    {name: 'Restaurant', value: 'restaurant'},
    {name: 'Bar', value: 'bar'},
    {name: 'Airport', value: 'airport'},
    {name: 'Amusement Park', value: 'amusement_park'},
    {name: 'Campground', value: 'campground'},
    {name: 'Car Dealer', value: 'car_dealer'},
    {name: 'Car Repair', value: 'car_repair'},
    {name: 'Car Wash', value: 'car_wash'},
    {name: 'Casino', value: 'casino'},
    {name: 'Convenience Store', value: 'convenience_store'},
    {name: 'Doctor', value: 'doctor'},
    {name: 'Gas Station', value: 'gas_station'},
    {name: 'Library', value: 'library'},
    {name: 'Lodging', value: 'lodging'},
    {name: 'Museum', value: 'museum'},
    {name: 'Night Club', value: 'night_club'},
    {name: 'Park', value: 'park'},
    {name: 'Parking', value: 'parking'},
    {name: 'Shopping Mall', value: 'shopping_mall'},
    {name: 'Stadium', value: 'stadium'},
    {name: 'Supermarket', value: 'supermarket'},
    {name: 'Veterinarian', value: 'veterinary_care'},
    {name: 'Zoo', value: 'zoo'}
  ];

  @Output() populated = new EventEmitter(); // Custom event that is emitted when the results are received.

  constructor(private geocoder: GeocodingService, private places: GooglePlacesService) { }

  ngOnInit(): void {
    this.model.address = window.localStorage.getItem('start'); // Set the input value from localStorage.
  }

  // This runs when the form is submitted.
  onSubmit(): void {
    this.finished = false;
    this.submitted = true;
    let coords;
    this.geocoder.geocodeAddress(this.model.address).subscribe((response: any) => {
      window.localStorage.setItem('start', this.model.address);
      coords = response.results[0].geometry.location;
      console.log(coords);
      this.places.placesNear(coords, this.model.type).subscribe((placesResponse: any) => {
        console.log(placesResponse);
        this.results = placesResponse.results;
        this.populated.emit([this.results, response]);
        this.finished = true;
      });
    });
  }

  // Clears the form and the data in localStorage.
  clearForm(): boolean {
    const form = document.forms[0];
    window.localStorage.removeItem('start');
    window.localStorage.removeItem('end');
    form.reset();
    return false;
  }

}
