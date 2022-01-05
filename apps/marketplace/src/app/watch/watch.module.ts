import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { WatchComponent } from './watch.component';
import { JwplayerModule } from '@nft/ui/jwplayer/jwplayer.module';

@NgModule({
  declarations: [
    WatchComponent
  ],
  imports: [
    CommonModule,
    JwplayerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([{ path: '', component: WatchComponent }]),
  ]
})
export class WatchModule { }
