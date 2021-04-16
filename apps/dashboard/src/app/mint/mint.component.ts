import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'nft-mint',
  templateUrl: './mint.component.html',
  styleUrls: ['./mint.component.scss'],
})
export class MintComponent {
  readonly separatorKeyCodes = [ENTER, COMMA];

  public mintForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    jwPlayerId: new FormControl(''),
    description: new FormControl(''),
    metadata: new FormGroup({
      runningTime: new FormControl(null, Validators.required),
      countries: new FormArray([])
    })
  });

  onSubmit() {
  }

  get countries() {
    return this.mintForm.controls.metadata.get('countries') as FormArray;
  }

  // CHIPS LOGIC
  add(event: MatChipInputEvent) {
    this.countries.push(new FormControl(event.value));
    event.input.value = '';
  }

  remove(index: number) {
    this.countries.removeAt(index);
  }
}
