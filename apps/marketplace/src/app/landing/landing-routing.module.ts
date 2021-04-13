import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { EthereumWalletGuard } from '@nft/metamask';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [EthereumWalletGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
