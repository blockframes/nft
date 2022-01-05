import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthereumWalletGuard } from '@nft/metamask/guard/wallet.guard';
import { NoEthereumWalletGuard } from '@nft/metamask/guard/nowallet.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'mint',
    loadChildren: () => import('./mint/mint.module').then(m => m.MintModule)
  },
  {
    path: 'signin',
    canActivate: [NoEthereumWalletGuard],
    loadChildren: () => import('@nft/metamask/page/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'account',
    canActivate: [EthereumWalletGuard],
    loadChildren: () => import('./tokens/tokens.module').then(m => m.TokensModule)
  },
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'corrected',
    })
  ]
})
export class AppRoutingModule { }
