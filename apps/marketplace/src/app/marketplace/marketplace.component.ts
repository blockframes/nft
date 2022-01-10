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

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    const { collection } = this.route.snapshot.params;
    if (!collection) return;
    const collectionSearch = '&search[stringTraits][0][name]=Title&search[stringTraits][0][values][0]=';
    this.marketplaceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.openSeaUrl}${collectionSearch}${collection}`);
  }
}
