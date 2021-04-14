import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerRoutingModule } from './player-routing.module';

import { PlayerComponent } from './player.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    MatSnackBarModule,
  ]
})
export class PlayerModule { }
