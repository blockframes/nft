import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    FlexLayoutModule,
    MatCardModule
  ],
  declarations: [
    LandingComponent,
  ]
})
export class LandingModule { }
