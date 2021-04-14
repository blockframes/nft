import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthereumWalletGuard, NoEthereumWalletGuard } from '@nft/metamask';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    canActivate: [NoEthereumWalletGuard],
    loadChildren: () => import('@nft/metamask').then(m => m.SigninModule)
  },
  {
    path: 'account',
    canActivate: [EthereumWalletGuard],
    loadChildren: () => import('@nft/metamask').then(m => m.AccountModule),
  },
  {
    path: 'watch/:tokenId',
    canActivate: [EthereumWalletGuard],
    loadChildren: () => import('./watch/watch.module').then(m => m.WatchModule)
  }
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
