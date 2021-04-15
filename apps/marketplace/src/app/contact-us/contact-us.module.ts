import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ContactUsComponent } from './contact-us.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: '', component: ContactUsComponent }];


@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactUsModule { }
