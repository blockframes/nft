import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoEthereumWalletGuard } from '@nft/metamask';
import { SigninComponent } from './signin.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
    canActivate: [NoEthereumWalletGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule { }
