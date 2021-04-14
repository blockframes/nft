import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MyTokensComponent } from './my-tokens.component';

const routes: Routes = [{ path: '', component: MyTokensComponent }];

@NgModule({
  declarations: [MyTokensComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MyTokensModule { }
