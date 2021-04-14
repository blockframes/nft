import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { WatchComponent } from './watch.component';

@NgModule({
  declarations: [
    WatchComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild([{ path: '', component: WatchComponent }]),
  ]
})
export class WatchModule { }
