import { PipesModule } from './../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { RideShareFormComponent } from './ride-share-form/ride-share-form.component';
import { RideShareComparisonComponent } from './ride-share-comparison/ride-share-comparison.component';
import { PriceListsComponent } from './price-lists/price-lists.component';
import { LyftPricesComponent } from './lyft-prices/lyft-prices.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UberPricesComponent } from './uber-prices/uber-prices.component';
import { AgmCoreModule } from '../../../node_modules/@agm/core';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule,
    AppRoutingModule,
    PipesModule.forRoot()
  ],
  declarations: [
    LyftPricesComponent,
    PriceListsComponent,
    RideShareComparisonComponent,
    RideShareFormComponent,
    UberPricesComponent
  ],
  exports: [
    RideShareComparisonComponent
  ]
})
export class RideShareModule { }
