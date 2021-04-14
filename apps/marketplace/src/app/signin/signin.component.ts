import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetamaskService } from '@nft/metamask';

@Component({
  selector: 'nft-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(
    private metamaskService: MetamaskService,
    private router: Router,
  ) { }

  public async signIn() {
    await this.metamaskService.requestAccount();
    this.router.navigate(['/landing']);
  }

}
