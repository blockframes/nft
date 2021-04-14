import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MyTokensComponent } from './my-tokens.component';
import { EthereumWalletGuard } from '@nft/metamask';

const routes: Routes = [{
  path: '',
  component: MyTokensComponent,
  canActivate: [EthereumWalletGuard]
}];

@NgModule({
  declarations: [MyTokensComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MyTokensModule { }
