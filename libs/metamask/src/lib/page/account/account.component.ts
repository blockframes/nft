import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MetamaskService } from '../../+state/metamask.service';
import { ERC1155 } from '../../+state/erc1155';

@Component({
  selector: 'nft-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent {
  tokens$ = this.metamask.getAccount().then(account => this.erc1155.getTokens(account));
  
  constructor(
    private metamask: MetamaskService,
    private erc1155: ERC1155,
  ) { }

}
