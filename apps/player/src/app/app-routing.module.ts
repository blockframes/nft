import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthereumWalletGuard } from '@nft/metamask';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'watch/abcdef123', // @TODO TEMP until we have a page to display titles
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('@nft/metamask').then(m => m.SigninModule)
  },
  {
    path: 'account',
    canActivate: [EthereumWalletGuard],
    loadChildren: () => import('@nft/metamask').then(m => m.AccountModule),
  },
  {
    path: 'watch/:tokenId',
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
