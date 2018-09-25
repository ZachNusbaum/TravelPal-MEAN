import { Trip } from './trip';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  base_uri = 'https://zachdn.us/civicz/api/geocoding.php';

  // Inject the HttpClient.
  constructor(private http: HttpClient) { }

  // This method takes a Trip (start_address, end_address) and geocodes the addresses using Google Geocoding API.
  geocodeTrip(trip: Trip) {
    // Since there are two addresses, the api needs to be called twice.
    const request1 = this.http.get(`${this.base_uri}?address=${trip.start_address}`);
    const request2 = this.http.get(`${this.base_uri}?address=${trip.end_address}`);

    // Run both requests in parallel (forkJoin)
    return forkJoin([request1, request2]);
  }

  geocodeAddress(address) {
    return this.http.get(`${this.base_uri}?address=${address}`);
  }
}
