import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nft-marketplace',
  templateUrl: 'marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceComponent {}