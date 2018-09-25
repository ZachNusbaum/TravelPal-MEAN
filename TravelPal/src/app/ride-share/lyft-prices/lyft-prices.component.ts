import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lyft-prices',
  templateUrl: './lyft-prices.component.html',
  styleUrls: ['./lyft-prices.component.css']
})
export class LyftPricesComponent implements OnInit {
  // Accepts the list of services prices as input
  @Input() prices: any;
  constructor() { }

  ngOnInit(): void {
  }

}
