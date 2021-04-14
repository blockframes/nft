import { Injectable, OnInit } from '@angular/core';
import { OpenSeaPort, Network } from 'opensea-js'
import { MetamaskService } from './metamask.service';

@Injectable({ providedIn: 'root' })
export class OpenSeaService implements OnInit {
  seaport!: OpenSeaPort;
  constructor(private metamask: MetamaskService) { }

  async ngOnInit() {
    if (this.metamask.provider) {
      this.seaport = new OpenSeaPort(this.metamask.provider, {
        networkName: Network.Rinkeby
      })
    } else {
      await this.metamask.getAccount()
      this.seaport = new OpenSeaPort(this.metamask.provider, {
        networkName: Network.Rinkeby
      })
    }
  }
}