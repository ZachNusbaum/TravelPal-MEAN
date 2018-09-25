import { GooglePlacesService } from './../../google-places.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private places: GooglePlacesService) { }

  // This is the place_id from the Google Places API.
  place_id: string;

  // Data about the place.
  data = null;

  ngOnInit(): void {
    // Each time the component is loaded, reset the data.
    this.data = null;
    // Get the parameters from
    this.route.params.subscribe(params => {
      // Get the place_id.
      this.place_id = params.id;
      // Send the request to get more info about the place.
      this.places.getPlace(params.id).subscribe((response: any) => {
        console.log('Place data:', response);
        this.data = response.result;
      });
    });
  }

}
