import { Component, OnInit } from '@angular/core';
import { MetamaskService } from 'libs/metamask/src/lib/+state/metamask.service';

@Component({
  selector: 'nft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedIn: undefined | boolean;

  constructor(
    public metamaskService: MetamaskService
  ) { }

  async ngOnInit() {
    this.loggedIn = await this.metamaskService.hasAccount();
  }

  public async switchAccount() {
    await this.metamaskService.changeAccount();
  }
}
