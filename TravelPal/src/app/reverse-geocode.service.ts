import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReverseGeocodeService {
  base_uri = 'https://maps.googleapis.com/maps/api';
  // This API Key has cross-origin restrictions. Replace with your own.
  api_key = 'AIzaSyBlnRV_RD8WL_Pf0_hkMgPDsoqPfEDpWEk';

  // Inject the HttpClient.
  constructor(private http: HttpClient) { }

  // Take a latitude and longitude {lat: ..., lng: ...} and returns the nearest address.
  public reverseGeocode(location: any) {
    return this.http.get(`${this.base_uri}/geocode/json?latlng=${location.lat},${location.lng}&key=${this.api_key}`);
  }
}
