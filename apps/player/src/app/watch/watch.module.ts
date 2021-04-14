import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchRoutingModule } from './watch-routing.module';

import { WatchComponent } from './watch.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    WatchComponent
  ],
  imports: [
    CommonModule,
    WatchRoutingModule,
    MatSnackBarModule,
  ]
})
export class WatchModule { }
