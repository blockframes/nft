
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamaskService } from '@nft/metamask';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayerResponse, SignedMessage } from '@nft/model';

import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'nft-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent {

  getPlayerId = this.functions.httpsCallable<SignedMessage, PlayerResponse>('getPlayerId');

  public loading$ = new BehaviorSubject(false);
  public player$ = new ReplaySubject<PlayerResponse>();

  constructor(
    private route: ActivatedRoute,
    private metamaskService: MetamaskService,
    private functions: AngularFireFunctions,
    private snackBar: MatSnackBar,
  ) { }

  async signMessage() {
    this.loading$.next(true);
    try {
      const tokenId = parseInt(this.route.snapshot.paramMap.get('tokenId') as string, 10);
      const message = 'I confirm that I own this token';
      const signature = await this.metamaskService.signMessage(message);
      const playerUrl = await this.getPlayerId({ tokenId, message, signature }).toPromise();
      this.snackBar.open('Message signed !', '', { duration: 2000 });
      console.log(playerUrl);
      this.player$.next(playerUrl);
    } catch (error) {
      console.error(error);
      this.snackBar.open('Could not sign message', '', { duration: 2000 });
    } finally {
      this.loading$.next(false);
    }
  }

}
