import { ChangeDetectorRef, Component } from '@angular/core';
import { MetamaskService } from 'libs/metamask/src/lib/+state/metamask.service';

@Component({
  selector: 'nft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public loggedIn!: string;

  constructor(
    public metamaskService: MetamaskService,
    private cdr: ChangeDetectorRef
  ) { }
  async connect() {
    this.loggedIn = await this.metamaskService.requestAccount();
    this.cdr.markForCheck();
  }
}
