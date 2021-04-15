import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwplayerComponent } from './jwplayer.component';



@NgModule({
  declarations: [JwplayerComponent],
  exports: [JwplayerComponent],
  imports: [
    CommonModule,
  ]
})
export class JwplayerModule { }
