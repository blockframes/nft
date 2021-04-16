import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetamaskService } from 'libs/metamask/src/lib/+state/metamask.service';

@Component({
  selector: 'nft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public metamaskService: MetamaskService,
    private router: Router
  ) { }

  async connect() {
    const account = await this.metamaskService.requestAccount();
    if (!!account && this.router.url.includes('signin')) {
      this.router.navigate(['/']);
    }
  }
}
