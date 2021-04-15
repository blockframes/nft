import { Component } from '@angular/core';
import { ERC1155 } from 'libs/metamask/src/lib/+state/erc1155';
import { MetamaskService } from 'libs/metamask/src/lib/+state/metamask.service';

@Component({
  selector: 'nft-my-tokens',
  templateUrl: './my-tokens.component.html',
  styleUrls: ['./my-tokens.component.scss']
})
export class MyTokensComponent {
  account$ = this.metamask.getAccount();
  tokens$ = this.account$.then(async account => this.erc1155.getTokens(account));

  constructor(
    public metamask: MetamaskService,
    private erc1155: ERC1155,
  ) { }

}
