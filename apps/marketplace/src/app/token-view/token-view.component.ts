
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireFunctions } from '@angular/fire/functions';

import { PlayerResponse, SignedMessage } from '@nft/model/models';
import { MetamaskService } from '@nft/metamask/+state/metamask.service';
import { ERC1155 } from '@nft/metamask/+state/erc1155';
import { Title } from '@nft/model/title';


@Component({
  selector: 'nft-token-view',
  templateUrl: './token-view.component.html',
  styleUrls: ['./token-view.component.scss']
})
export class TokenViewComponent implements OnInit {

  getPlayerId = this.functions.httpsCallable<SignedMessage, PlayerResponse>('getPlayerId');

  public playerLoading$ = new BehaviorSubject(false);
  public player$ = new ReplaySubject<PlayerResponse>();
  public token$ = new ReplaySubject<Title>();

  private tokenId = -1;

  constructor(
    private route: ActivatedRoute,
    private metamaskService: MetamaskService,
    private functions: AngularFireFunctions,
    private snackBar: MatSnackBar,
    private erc1155: ERC1155,
  ) { }

  async ngOnInit() {
    this.tokenId = parseInt(this.route.snapshot.paramMap.get('tokenId') as string, 10);
    const token = await this.erc1155.getMeta(this.tokenId);
    this.token$.next(token);
  }

  async signMessage() {
    this.playerLoading$.next(true);
    try {
      const message = 'I confirm that I own this token';
      const signature = await this.metamaskService.signMessage(message);
      const player = await this.getPlayerId({ tokenId: this.tokenId, message, signature }).toPromise();
      this.snackBar.open('Message signed !', '', { duration: 2000 });
      this.player$.next(player);
    } catch (error) {
      console.error(error);
      this.snackBar.open('Could not sign message', '', { duration: 2000 });
    } finally {
      this.playerLoading$.next(false);
    }
  }

}
