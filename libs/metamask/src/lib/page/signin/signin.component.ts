import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MetamaskService } from '../../+state/metamask.service';

@Component({
  selector: 'nft-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent {

  constructor(
    private metamaskService: MetamaskService,
    private router: Router,
  ) { }

  public async signIn() {
    await this.metamaskService.requestAccount();
    this.router.navigate(['/account']);
  }

}