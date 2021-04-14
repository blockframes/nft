import { Component, OnInit } from '@angular/core';
import { MetamaskService } from 'libs/metamask/src/lib/+state/metamask.service';

@Component({
  selector: 'nft-my-tokens',
  templateUrl: './my-tokens.component.html',
  styleUrls: ['./my-tokens.component.scss']
})
export class MyTokensComponent implements OnInit {

  public loggedIn: undefined | boolean;

  constructor(
    public metamaskService: MetamaskService
  ) { }

  async ngOnInit() {
    this.loggedIn = await this.metamaskService.hasAccount()
  }

  public async signIn() {
    const account = await this.metamaskService.requestAccount();
    this.loggedIn = !!account;
  }

}
