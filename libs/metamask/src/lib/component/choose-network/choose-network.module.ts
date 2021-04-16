import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChooseNetworkComponent } from './choose-network.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    ChooseNetworkComponent
  ],
  exports: [
    ChooseNetworkComponent
  ]
})
export class NetworkModule { }
