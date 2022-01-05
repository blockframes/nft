
import { Component } from '@angular/core';

import { ERC1155 } from '@nft/metamask/+state/erc1155';

@Component({
  selector: 'nft-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss'],
})
export class TokensComponent {
  tokens$ = this.erc1155.getAllTokens()

  constructor(private erc1155: ERC1155) {}
}
