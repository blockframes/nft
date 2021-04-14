import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTokensComponent } from './my-tokens.component';


@NgModule({
  declarations: [
    MyTokensComponent
  ],
  imports: [
    CommonModule,
    MyTokensComponent
  ]
})
export class MyTokensModule { }
