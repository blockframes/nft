import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthereumWalletGuard } from '@nft/metamask';
import { PlayerComponent } from './player.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    canActivate: [EthereumWalletGuard],
  },
  {
    path: ':tokenId',
    component: PlayerComponent,
    canActivate: [EthereumWalletGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
