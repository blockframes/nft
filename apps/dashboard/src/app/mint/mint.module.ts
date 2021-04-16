import { NgModule } from '@angular/core';
import { MintComponent } from './mint.component';
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [MintComponent],
  imports: [RouterModule.forChild([{ path: '', component: MintComponent }])],
  providers: [],
  bootstrap: [MintComponent],
})
export class MintModule { }
