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
    loadChildren: () => import('../../../marketplace/src/app/my-tokens/my-tokens.module').then(m => m.MyTokensModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('../../../marketplace/src/app/contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: 'marketplace',
    loadChildren: () => import('../../../marketplace/src/app/marketplace/marketplace.module').then(m => m.MarketplaceModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('../../../marketplace/src/app/faq/faq.module').then(m => m.FAQModule)
  },
  {
    path: 'signin',
    canActivate: [NoEthereumWalletGuard],
    loadChildren: () => import('@nft/metamask').then(m => m.SigninModule)
  },
  {
    path: 'mint',
    loadChildren: () => import('./mint/mint.module').then(m => m.MintModule)
  },

]

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
