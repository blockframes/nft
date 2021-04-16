import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LandingComponent } from './landing.component';

import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LandingComponent }]),
    FlexLayoutModule,
    MatCardModule
  ],
  declarations: [
    //LandingComponent got an incomprehensible error if i don't remove this
  ]
})
export class LandingModule { }
