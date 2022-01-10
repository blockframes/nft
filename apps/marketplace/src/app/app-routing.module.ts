import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EthereumWalletGuard } from '@nft/metamask/guard/wallet.guard';
import { NoEthereumWalletGuard } from '@nft/metamask/guard/nowallet.guard';

const routes: Routes = [
  {
    path: 'account',
    canActivate: [EthereumWalletGuard],
    loadChildren: () => import('./my-tokens/my-tokens.module').then(m => m.MyTokensModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: 'marketplace',
    children: [
      {
        path: '',
        loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule),
      },
      {
        path: ':collection',
        loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule),
      }
    ]
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FAQModule)
  },
  {
    path: 'signin',
    canActivate: [NoEthereumWalletGuard],
    loadChildren: () => import('@nft/metamask/page/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'token/:tokenId',
    canActivate: [EthereumWalletGuard],
    loadChildren: () => import('./token-view/token-view.module').then(m => m.TokenViewModule)
  },
  {
    path: 'mint',
    canActivate: [EthereumWalletGuard],
    loadChildren: () => import('./mint/mint.module').then(m => m.MintModule)
  },
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
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
