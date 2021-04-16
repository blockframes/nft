import { Component, OnInit } from '@angular/core';
import env from '@nft/env';
import { MetamaskService } from '../../+state/metamask.service';

@Component({
  selector: 'nft-choose-network',
  templateUrl: './choose-network.component.html',
  styleUrls: ['./choose-network.component.scss']
})
export class ChooseNetworkComponent implements OnInit {

  public currentNetwork?: string;
  public requiredNetwork = env.eth.network;

  constructor(private metamaskService: MetamaskService) { }

  async ngOnInit() {
    this.currentNetwork = await this.metamaskService.getCurentNetwork();
  }

  public reload() {
    window.location.reload();
  }
}
