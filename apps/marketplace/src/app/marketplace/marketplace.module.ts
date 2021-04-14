import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketplaceComponent } from './marketplace.component';

const routes: Routes = [{ path: '', component: MarketplaceComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [MarketplaceComponent],
})
export class MarketplaceModule { }