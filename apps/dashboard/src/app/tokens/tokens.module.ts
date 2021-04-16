import { NgModule } from '@angular/core';
import { TokensComponent } from './tokens.component';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [TokensComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TokensComponent }]),
    MatCardModule
  ],
  providers: [],
  bootstrap: [TokensComponent],
})
export class TokensModule { }
