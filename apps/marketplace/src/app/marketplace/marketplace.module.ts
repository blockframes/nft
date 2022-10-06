import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketplaceComponent } from './marketplace.component';

const routes: Routes = [{ path: '', component: MarketplaceComponent }];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [MarketplaceComponent],
})
export class MarketplaceModule { }