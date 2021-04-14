import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamaskService } from '@nft/metamask';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'nft-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

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

      const f = this.functions.httpsCallable('verifyMessage');
      await f({ signature, message, tokenId: this.tokenId }).toPromise();
      this.snackBar.open('Message signed !', '', { duration: 2000 });
    } catch (error) {
      this.snackBar.open('Could not sign message', '', { duration: 2000 });
    }

  }
}
