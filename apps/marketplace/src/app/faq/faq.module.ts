import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FAQComponent } from './faq.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([{ path: '', component: FAQComponent }]),
    MatCardModule
  ],
  exports: [],
  declarations: [FAQComponent]
})
export class FAQModule { }
