import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule.forChild([{ path: '', component: AccountComponent }])
  ]
})
export class AccountModule { }
