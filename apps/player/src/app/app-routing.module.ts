import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'watch',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('@nft/metamask').then(m => m.SigninModule)
  },
  {
    path: 'watch',
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
