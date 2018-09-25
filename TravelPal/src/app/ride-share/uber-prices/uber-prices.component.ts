import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uber-prices',
  templateUrl: './uber-prices.component.html',
  styleUrls: ['./uber-prices.component.css']
})
export class UberPricesComponent implements OnInit {
  // This component accepts the JSON response from the Uber API as input (prices).
  @Input() prices: any[];

  constructor() { }

  ngOnInit(): void {
  }



}
