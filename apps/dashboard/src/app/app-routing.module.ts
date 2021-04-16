import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthereumWalletGuard, NoEthereumWalletGuard } from '@nft/metamask';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mint',
    pathMatch: 'full'
  },
  {
    path: 'mint',
    loadChildren: () => import('./mint/mint.module').then(m => m.MintModule)
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
