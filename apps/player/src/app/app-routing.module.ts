import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
