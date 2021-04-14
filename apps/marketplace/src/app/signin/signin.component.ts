import { Component } from '@angular/core';
import { MetamaskService } from '@nft/metamask';

@Component({
  selector: 'nft-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(private metamaskService: MetamaskService) { }

  public async signIn() {
    const data = await this.metamaskService.requestAccount();
    console.log(data);

   /* const message = 'test bruce';
    const signature = await this.metamaskService.signMessage(message);

    const isSigner = this.metamaskService.verifyMessage(message, signature);

    console.log(isSigner);*/
  }

}
