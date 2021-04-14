import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamaskService } from '@nft/metamask';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignedMessage } from '@nft/model';

@Component({
  selector: 'nft-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent {

  getPlayerId = this.functions.httpsCallable<SignedMessage, string>('getPlayerId');

  public playerUrl?: string;

  constructor(
    private route: ActivatedRoute,
    private metamaskService: MetamaskService,
    private functions: AngularFireFunctions,
    private snackBar: MatSnackBar,
  ) { }

  async signMessage() {
    try {
      const tokenId = this.route.snapshot.paramMap.get('getPlayerId') as string;
      const message = 'I confirm that I own this token';
      const signature = await this.metamaskService.signMessage(message);
      this.playerUrl = await this.getPlayerId({ tokenId, message, signature }).toPromise();
      this.snackBar.open('Message signed !', '', { duration: 2000 });
      console.log(this.playerUrl);
    } catch (error) {
      this.snackBar.open('Could not sign message', '', { duration: 2000 });
    }
  }

}
