import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms';
import { MintComponent } from './mint.component';

// MATERIALS
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [MintComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // MATERIALS
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    RouterModule.forChild([{ path: '', component: MintComponent }])
  ]
})
export class MintModule { }
