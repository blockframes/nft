import { Component, OnInit } from '@angular/core';
import { MetamaskService } from 'libs/metamask/src/lib/+state/metamask.service';
import { OpenSeaService } from 'libs/metamask/src/lib/+state/open-sea.service';

@Component({
  selector: 'nft-my-tokens',
  templateUrl: './my-tokens.component.html',
  styleUrls: ['./my-tokens.component.scss']
})
export class MyTokensComponent implements OnInit {

  public loggedIn: undefined | boolean;
  public item: any;

  constructor(
    public metamaskService: MetamaskService,
    private openseaService: OpenSeaService
  ) { }

  async ngOnInit() {
    this.loggedIn = await this.metamaskService.hasAccount();

    this.item = this.openseaService.getItem('0xeE45B41D1aC24E9a620169994DEb22739F64f231', '28617087641888108276224327395903793873568828356690862626991544740160519274497')
  }

  public async signIn() {
    const account = await this.metamaskService.requestAccount();
    this.loggedIn = !!account;
  }

}
