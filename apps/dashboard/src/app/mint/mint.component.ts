import { Component } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'nft-mint',
  templateUrl: './mint.component.html',
  styleUrls: ['./mint.component.scss'],
})
export class MintComponent {
  countries: string[] = [];
  readonly separatorKeyCodes = [ENTER, COMMA]


  // CHIPS LOGIC
  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.countries.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(country: string) {
    const index = this.countries.indexOf(country);
    if (index >= 0) {
      this.countries.splice(index, 1);
    }
  }
}
