import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthereumWalletGuard, NoEthereumWalletGuard } from '@nft/metamask';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
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
    loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FAQModule)
  },
  {
    path: 'signin',
    canActivate: [NoEthereumWalletGuard],
    loadChildren: () => import('@nft/metamask').then(m => m.SigninModule)
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
