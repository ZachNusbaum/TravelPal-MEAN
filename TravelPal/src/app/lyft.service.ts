import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LyftService {
  base_uri = 'https://zachdn.us/rides/lyft.php';

  // Inject the HttpClient.
  constructor(private http: HttpClient) { }

  // Gets the current service information from the Lyft API.
  public getEstimates(c1, c2) {
    return this.http.get(this.base_uri + `?start_lat=${c1.lat}&start_lng=${c1.lng}&end_lat=${c2.lat}&end_lng=${c2.lng}`);
  }
}