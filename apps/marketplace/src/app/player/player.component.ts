import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamaskService } from '@nft/metamask';
import { AngularFireFunctions } from '@angular/fire/functions';

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
    private functions: AngularFireFunctions // @TODO move to appropriate service
  ) { }

  ngOnInit(): void {
    this.tokenId = this.route.snapshot.paramMap.get('tokenId') as string;
  }

  public async signMessage() {
    const message = 'I confirm that I own this token';
    const signature = await this.metamaskService.signMessage(message);

    const f = this.functions.httpsCallable('verifyMessage');
    await f({ signature, message, tokenId: this.tokenId }).toPromise();
  }
}
