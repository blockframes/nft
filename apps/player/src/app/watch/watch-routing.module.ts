import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthereumWalletGuard } from '@nft/metamask';
import { WatchComponent } from './watch.component';

const routes: Routes = [
  {
    path: '',
    component: WatchComponent,
    canActivate: [EthereumWalletGuard],
  },
  {
    path: ':tokenId',
    component: WatchComponent,
    canActivate: [EthereumWalletGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchRoutingModule { }
