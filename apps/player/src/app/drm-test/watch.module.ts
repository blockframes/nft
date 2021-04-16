
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { WatchComponent } from './watch.component';
import { JwplayerModule } from '../jwplayer/jwplayer.module';

@NgModule({
  declarations: [
    WatchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JwplayerModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: WatchComponent }]),
  ]
})
export class WatchModule { }
