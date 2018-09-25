import { LatLng } from './lat-lng';
import { GeocodingService } from './geocoding.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  base_uri = 'https://zachdn.us/civicz/api/places.php';
  detail_base_uri = 'https://zachdn.us/civicz/api/place_detail.php';

  // Inject the HttpClient and GeocodingService.
  constructor(private http: HttpClient, private geocoder: GeocodingService) { }

  // Finds a list of places near a given set of coordinates, and a type of place (as defined by the google API).
  public placesNear(coords: LatLng, type: string) {
    return this.http.get(`${this.base_uri}?location=${coords.lat},${coords.lng}&type=${type}`);
  }

  // Gets details about a specific place, given a Google Place ID.
  public getPlace(place_id: string) {
    return this.http.get(`${this.detail_base_uri}?placeid=${place_id}`);
  }
}
