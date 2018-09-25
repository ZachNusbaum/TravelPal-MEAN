import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-places-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() submitted;
  @Input() finished;
  places: any[]; // Variable that holds the search results once received.
  loaded: boolean = false; // Is the places variable populated?
  coords: any; // Lat,Lng coordinates for the submitted address.
  bounds: any; // (Not used) The Lat,Lng boundaries for the submitted address.
  constructor() { }

  ngOnInit(): void {
  }

  receiveData(event): void {
    this.loaded = false; // New address submitted, data is now stale (not loaded).
    this.places = event[0]; // Replace the old search results with the new.
    this.loaded = true; // Data is now loaded again
    this.coords = event[1].results[0]; // Save the geocoded address.
    this.bounds = {north: this.coords.geometry.bounds.northeast.lat,
      east: this.coords.geometry.bounds.northeast.lng,
      south: this.coords.geometry.bounds.southwest.lat,
      west: this.coords.geometry.bounds.southwest.lng};
    console.log('COORDS ', this.coords);
  }

}
