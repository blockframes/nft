import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ERC1155 } from '@nft/metamask';

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
    quantity: new FormControl(1),
    metadata: new FormGroup({
      runningTime: new FormControl(null, Validators.required),
      countries: new FormArray([])
    })
  });

  constructor(private erc1155: ERC1155) {}

  async onSubmit() {
    await this.erc1155.mint(this.mintForm.get('quantity')!.value, this.mintForm.value)
  }

  get countries() {
    return this.mintForm.get('metadata')!.get('countries') as FormArray;
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
