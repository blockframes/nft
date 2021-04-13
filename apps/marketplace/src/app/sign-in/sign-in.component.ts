import { Component } from '@angular/core';
import { MetamaskService } from '@nft/metamask';

@Component({
  selector: 'nft-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

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
