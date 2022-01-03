import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { ERC1155 } from 'libs/metamask/src/lib/+state/erc1155';
import { MetamaskService } from 'libs/metamask/src/lib/+state/metamask.service';

import environment from '@nft/env';


@Component({
  selector: 'nft-my-tokens',
  templateUrl: './my-tokens.component.html',
  styleUrls: ['./my-tokens.component.scss']
})
export class MyTokensComponent implements OnInit {
  playerUrl = environment.appUrl.player;
  account$ = this.metamask.getAccount();
  tokens$ = this.account$.then(async account => this.erc1155.getTokens(account));
  storeUserCountry = this.functions.httpsCallable('storeUserCountry');

  constructor(
    private erc1155: ERC1155,
    public metamask: MetamaskService,
    private functions: AngularFireFunctions,
  ) { }

  async ngOnInit() {
    const address = await this.account$;
    this.storeUserCountry({ address }).toPromise();
  }
}
