import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UberService {
  base_uri = 'https://zachdn.us/rides/uber.php';

  constructor(private http: HttpClient) {}

  // Submits the geocoded addresses (lat, lng) to the Uber API.
  public getPrices(coords1, coords2) {
    return this.http.get(
      this.base_uri +
        `?start_latitude=${coords1.lat}&start_longitude=${coords1.lng}&end_latitude=${coords2.lat}&end_longitude=${coords2.lng}`
    );
  }
}
