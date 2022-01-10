
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Title } from '@nft/model/title';
import { ERC1155 } from '@nft/metamask/+state/erc1155';
import { StoreMetadataParams } from '@nft/model/models';
import { MetamaskService } from '@nft/metamask/+state/metamask.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'nft-mint',
  templateUrl: './mint.component.html',
  styleUrls: ['./mint.component.scss'],
})
export class MintComponent {

  public storeMetadata = this.functions.httpsCallable<StoreMetadataParams, number>('storeMetadata');

  public mintForm = new FormGroup({
    quantity: new FormControl(1, [Validators.min(1), Validators.required]),

    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    description: new FormControl(''),
    title: new FormControl('', Validators.required),

    image: new FormControl('', Validators.required),
    animation: new FormControl(''),
    jwPlayerId: new FormControl(''),
  });

  public loading$ = new BehaviorSubject(false);

  constructor(
    private erc1155: ERC1155,
    private snackBar: MatSnackBar,
    private metmask: MetamaskService,
    private functions: AngularFireFunctions,
  ) { }

  async mint() {
    if (this.mintForm.invalid) return;

    const { value } = this.mintForm;

    const id = await this.erc1155.getNextId();

    console.log(`Will mint nft with id ${id}`);

    const txReceipt = await this.erc1155.mint(value.quantity, id.toString(10));

    console.log('Tx mined!', txReceipt);

    if (!txReceipt?.status) {
      console.warn(txReceipt);
      throw new Error('Transaction Failed !');
    }
  }

  async saveMeta(message = 'I confirm that I have the right to mint NFTs.', inputSignature?: string) {

    try {
      if (this.mintForm.invalid) return;

      this.loading$.next(true);

      const { value } = this.mintForm;

      const signature = inputSignature ?? await this.metmask.signMessage(message);

      const title: Title = {
        attributes: [{
          trait_type: 'Title',
          value: value.title,
        }],
        description: value.description,
        image: value.image,
        name: value.name,
        animation_url: value.animation,
        jwPlayerId: value.jwPlayerId,
        author: value.author,
      };

      console.log('calling backend function to save metadata');

      const tokenId = await this.storeMetadata({ message, signature, title }).toPromise();

      console.log(`Metadata saved for token ${tokenId}`);
      this.loading$.next(false);
    } catch (error) {
      console.error(error);
      this.snackBar.open('Something went wrong!', '', { duration: 2000 });
    } finally {
      this.loading$.next(false);
    }
  }

  async onSubmit() {
    try {
      this.loading$.next(true);
      const message = 'I confirm that I have the right to mint NFTs.';
      const signature = await this.metmask.signMessage(message);

      await this.mint();
      await this.saveMeta(message, signature);
    } catch (error) {
      console.error(error);
      this.snackBar.open('Something went wrong!', '', { duration: 2000 });
    } finally {
      this.loading$.next(false);
    }
  }
}
