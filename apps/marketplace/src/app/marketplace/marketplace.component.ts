import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import env from '@nft/env';

@Component({
  selector: 'nft-marketplace',
  templateUrl: 'marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceComponent implements OnInit {

  private openSeaUrl = env.openSeaUrl;

  public marketplaceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.openSeaUrl);

  private apiURl = 'https://api.opensea.io/api/v1/collection/filmseriesnft?format=json';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }

  public get(): Promise<any> {
    return (this.http.get<{ collection: unknown }>(this.apiURl)).toPromise()
      .then(data => data.collection)
      .catch(() => 'unknown');
  }

  async ngOnInit() {
    const {primary_asset_contracts, stats} = await this.get();
    console.log(primary_asset_contracts, stats);

    const element = document.createElement('nft-card');
    element.setAttribute('contractAddress', '0x0ffacfbc07c81a4a6f28f84cc7afb02e96f4f1df');
    element.setAttribute('tokenId', '0');

    document.getElementById('asset-container')?.appendChild(element);

    const element2 = document.createElement('nft-card');
    element2.setAttribute('contractAddress', '0x0ffacfbc07c81a4a6f28f84cc7afb02e96f4f1df');
    element2.setAttribute('tokenId', '49');

    document.getElementById('asset-container')?.appendChild(element2);

    const element3 = document.createElement('nft-card');
    element3.setAttribute('contractAddress', '0x0ffacfbc07c81a4a6f28f84cc7afb02e96f4f1df');
    element3.setAttribute('tokenId', '36');

    document.getElementById('asset-container')?.appendChild(element3);

    const element4 = document.createElement('nft-card');
    element4.setAttribute('contractAddress', '0x0ffacfbc07c81a4a6f28f84cc7afb02e96f4f1df');
    element4.setAttribute('tokenId', '37');

    document.getElementById('asset-container')?.appendChild(element4);


    const { collection } = this.route.snapshot.params;
    if (!collection) return;
    const collectionSearch = '&search[stringTraits][0][name]=Title&search[stringTraits][0][values][0]=';
    this.marketplaceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.openSeaUrl}${collectionSearch}${collection}`);
  }
}
