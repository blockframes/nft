import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: AccountComponent }])
  ]
})
export class AccountModule { }
