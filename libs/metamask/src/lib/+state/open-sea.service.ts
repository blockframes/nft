import { Injectable, OnInit } from '@angular/core';
import { OpenSeaPort, Network } from 'opensea-js'
import { MetamaskService } from './metamask.service';
import env from '@nft/env';


@Injectable({ providedIn: 'root' })
export class OpenSeaService implements OnInit {
  seaport!: OpenSeaPort;

  constructor(private metamask: MetamaskService) {
  }

  async ngOnInit() {
    if (this.metamask.signer) {
      await this.metamask.getAccount()
    }
    this.seaport = new OpenSeaPort(this.metamask.signer, {
      networkName: env.production ? Network.Main : Network.Rinkeby
    })
  }

  async getItem(address: string, tokenId: string | number | null) {
    const item = await this.seaport.api.getAsset({ tokenAddress: address, tokenId });
    return item;
  }
}
