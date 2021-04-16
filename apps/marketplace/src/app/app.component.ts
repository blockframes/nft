import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetamaskService } from '@nft/metamask';

@Component({
  selector: 'nft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'marketplace';

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
