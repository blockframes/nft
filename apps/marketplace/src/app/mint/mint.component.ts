
import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ERC1155 } from '@nft/metamask/+state/erc1155';

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
    quantity: new FormControl(1, Validators.min(1)),
  });

  constructor(private erc1155: ERC1155) {}

  async onSubmit() {
    const quantityControl = this.mintForm.get('quantity');
    if (!quantityControl) throw new Error(`Can't find a "quantity" control in the FormGroup!`);

    await this.erc1155.mint(quantityControl.value, this.mintForm.value);
  }
}
