import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Trip } from './../../trip';

@Component({
  selector: 'app-ride-share-form',
  templateUrl: './ride-share-form.component.html',
  styleUrls: ['./ride-share-form.component.css']
})
export class RideShareFormComponent implements OnInit {
  // Setup a model that represents the fields of the form
  model: Trip = new Trip();

  // Indicates if the form has been submitted or not.
  submitted = false;

  // Creates a custom event (input received) that the parent element can subscribe to.
  @Output() inputreceived = new EventEmitter<any>();

  // Function that gets called when the form is submitted
  onSubmit(): boolean {
    // Save the addresses to localStorage
    window.localStorage.setItem('start', this.model.start_address);
    window.localStorage.setItem('end', this.model.end_address);

    // Emit the 'inputreceived' event.
    this.inputreceived.emit(this.model);

    // The form has now been submitted.
    this.submitted = true;
    return false;
  }

  // Function that gets called when clicking the clear button.
  clearAddresses(): boolean {
    // Remove the addresses from localStorage.
    window.localStorage.removeItem('start');
    window.localStorage.removeItem('end');

    // Clear the form fields.
    document.forms[0].reset();
    return false;
  }

  constructor() { }

  ngOnInit(): void | boolean {
    console.log(this.model);
    // Populate the form fields from localStorage.
    this.model.start_address = window.localStorage.getItem('start');
    this.model.end_address = window.localStorage.getItem('end');

    // If the addresses are saved in localStorage, submit the form automatically.
    if (!!this.model.start_address && !!this.model.end_address) {
      this.onSubmit();
    }
  }

}
