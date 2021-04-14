import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamaskService } from '@nft/metamask';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createSignedMessage } from '@nft/model';

@Component({
  selector: 'nft-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {

  private tokenId?: string;

  constructor(
    private route: ActivatedRoute,
    private metamaskService: MetamaskService,
    private functions: AngularFireFunctions, // @TODO move to appropriate service
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.tokenId = this.route.snapshot.paramMap.get('tokenId') as string;
  }

  public async signMessage() {
    try {
      const message = 'I confirm that I own this token';
      const signature = await this.metamaskService.signMessage(message);

      const f = this.functions.httpsCallable('getPlayerId');
      await f(createSignedMessage({ signature, message, tokenId: this.tokenId })).toPromise();
      this.snackBar.open('Message signed !', '', { duration: 2000 });
    } catch (error) {
      this.snackBar.open('Could not sign message', '', { duration: 2000 });
    }

  }
}
