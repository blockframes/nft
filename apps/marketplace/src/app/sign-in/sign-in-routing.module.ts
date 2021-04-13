import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoEthereumWalletGuard } from '@nft/metamask';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    canActivate: [NoEthereumWalletGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
