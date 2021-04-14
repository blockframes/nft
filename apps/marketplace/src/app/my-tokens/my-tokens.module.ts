import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MyTokensComponent } from './my-tokens.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [{
  path: '',
  component: MyTokensComponent,
}];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule
  ],
  declarations: [MyTokensComponent]
})
export class MyTokensModule { }
