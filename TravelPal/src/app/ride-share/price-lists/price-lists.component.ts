import { MongoService } from './../../mongo.service';
import { LyftService } from './../../lyft.service';
import { LatLng } from './../../lat-lng';
import { GeocodingService } from './../../geocoding.service';
import { Component, OnInit } from '@angular/core';
import { UberService } from '../../uber.service';

@Component({
  selector: 'app-price-lists',
  templateUrl: './price-lists.component.html',
  styleUrls: ['./price-lists.component.css']
})
export class PriceListsComponent implements OnInit {
  loading: boolean; // Is the app waiting for the geocode response?
  geocoded = false; // Has the form been geocoded?
  coords1: LatLng; // Coordinates for the start address
  coords2: LatLng; // Coordinates for the destination address
  uberLoading = true; // Waiting for the Uber API to respond
  uberPrices: any[]; // List of service prices from the Uber API

  lyftLoading = true;
  lyftPrices: any[];

  constructor(private geocoder: GeocodingService, private uber: UberService, private lyft: LyftService, private mongoService: MongoService) { }

  ngOnInit(): void {
  }

  // This function gets called in response to the 'inputreceived' event emitted by the form.
  geocode(trip): void | boolean {
    this.loading = true; // Geocoding is in progress
    this.uberLoading = true; // Waiting for the Uber API
    this.lyftLoading = true; // Waiting for the Lyft API
    this.geocoded = false; // The addresses are not yet geocoded
    console.log('Geocoding...', trip);

    // Send the start and destination addresses to the Google API, and subscribe to responses.
    this.geocoder.geocodeTrip(trip).subscribe((responses: any) => {
      // There are two responses, one for each request in the forkJoin.
      this.coords1 = responses[0].results[0].geometry.location;
      this.coords2 = responses[1].results[0].geometry.location;
      const dist = this.distance(this.coords1.lat, this.coords1.lng, this.coords2.lat, this.coords2.lng, 'M');
      if ( dist > 100 ) { alert('Error: Addresses are more than 100 miles apart.'); this.loading = false; return false; }
      this.loading = false; // At this point, the addresses are geocoded.
      this.geocoded = true;
      this.mongoService.addNew({input1: trip.start_address,
        input2: trip.end_address,
        lat1: responses[0].results[0].geometry.location.lat,
        lat2: responses[1].results[0].geometry.location.lat,
        lng1: responses[0].results[0].geometry.location.lng,
        lng2: responses[1].results[0].geometry.location.lng,
        timestamp: Date.now()}).subscribe((response: any) => {
          console.log(response);
        });
      console.log('Geocoded: ', [this.coords1, this.coords2]);
      // Send the geocoded addresses to the Uber API and subscribe to the response.
      this.uber.getPrices(this.coords1, this.coords2).subscribe((uberResponse: any) => {
        this.uberLoading = false; // Received the response from Uber API
        // Sort the response by lowest price estimate
        let sorted = uberResponse.prices.sort((x, y) => { return x.low_estimate - y.low_estimate });
        this.uberPrices = sorted; // Set the list of Uber prices equal to the sorted response
        console.log('Uber success!', uberResponse);
      }, error => { // Handle error response from Uber API
        alert('Uber API Error');
        console.log(error);
      });

      // Send the geocoded addresses to the Lyft API and subscribe to the response.
      this.lyft.getEstimates(this.coords1, this.coords2).subscribe((lyftResponse: any) => {
        this.lyftLoading = false; // Received the response from Lyft API
        // Sort the response by lowest price estimate
        let sorted: any[] = lyftResponse.cost_estimates.sort((x, y) => { x.estimated_cost_cents_min - y.estimated_cost_cents_min });
        this.lyftPrices = sorted; // Set the list of Lyft prices equal to the sorted response
        console.log('Lyft success!', this.lyftPrices);
      }, error => { // Handle error response from Lyft API.
        alert('Lyft error!');
        console.log(error);
      });
    }, error => { // Handle error response from Google API.
      alert('Error geocoding!');
      console.log(error);
    });

  }

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::                                                                         :::
  //:::  This routine calculates the distance between two points (given the     :::
  //:::  latitude/longitude of those points). It is being used to calculate     :::
  //:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
  //:::                                                                         :::
  //:::  Definitions:                                                           :::
  //:::    South latitudes are negative, east longitudes are positive           :::
  //:::                                                                         :::
  //:::  Passed to function:                                                    :::
  //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
  //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
  //:::    unit = the unit you desire for results                               :::
  //:::           where: 'M' is statute miles (default)                         :::
  //:::                  'K' is kilometers                                      :::
  //:::                  'N' is nautical miles                                  :::
  //:::                                                                         :::
  //:::  Worldwide cities and other features databases with latitude longitude  :::
  //:::  are available at https://www.geodatasource.com                          :::
  //:::                                                                         :::
  //:::  For enquiries, please contact sales@geodatasource.com                  :::
  //:::                                                                         :::
  //:::  Official Web site: https://www.geodatasource.com                        :::
  //:::                                                                         :::
  //:::               GeoDataSource.com (C) All Rights Reserved 2017            :::
  //:::                                                                         :::
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  distance(lat1, lon1, lat2, lon2, unit): number {
    let radlat1 = Math.PI * lat1/180;
    let radlat2 = Math.PI * lat2/180;
    let theta = lon1-lon2;
    let radtheta = Math.PI * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') { dist = dist * 1.609344; }
    if (unit === 'N') { dist = dist * 0.8684; }
    return dist;
  }

}
