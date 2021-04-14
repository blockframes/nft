import { Injectable } from '@angular/core';
import { Contract, Event, BigNumber } from 'ethers';
import { MetamaskService } from './metamask.service';
import env from '@nft/env';
import abi from '@nft/model/erc1155.json';

interface ERC1155_Event {
  TransferSingle: (operator: string, from: string, to: string, id: number, value: number) => void;
  TransferBatch: (operator: string, from: string, to: string, ids: number[], values: number[]) => void;
  ApprovalForAll: (owner: string, operator: string, approved: boolean) => void;
  URI: (value: string, id: number) => void;
}

export interface ERC1155_Meta {
  name: string;
  description: string;
  image: string;
  image_data?: string;
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
  attributes: { display_type?: string, trait_type: string, value: string }[];
}

export interface ERC1155_Token {
  id: string;
  account: string;
  balance: number;
  meta: ERC1155_Meta;
}

@Injectable({ providedIn: 'root' })
export class ERC1155 extends Contract {
  constructor(metamask: MetamaskService) {
    if (!metamask.signer) throw new Error('ERC1155 requires a signer');
    super(env.eth.erc1155, abi, metamask.signer);
  }

  async getTokens(account: string) {
    const ids = await this.getTokenIds(account);
    const promises = ids.map(async (id: number) => {
      const [ balance, meta ] = await Promise.all([
        this.balanceOf(account, id),
        this.getMeta(id)
      ]);
      return { id, account, balance, meta };
    });
    return Promise.all(promises);
  }

  getMeta(id: number): Promise<ERC1155_Meta> {
    return this.uri(id)
      .then(uri => fetch(uri))
      .then(res => res.json());
  }

  async getTokenIds(account: string) {
    const filter = this.filters.TransferSingle(null, null, account);
    const events = await this.queryFilter(filter);
    return events.map((event: Event): number => (event.args![3] as BigNumber).toNumber());
  }

  /**
    Get the balance of an account's tokens.
    @param owner  The address of the token holder
    @param id     ID of the token
    @return       The owner's balance of the token type requested
  */
  balanceOf(owner: string, id: number) {
    return super.functions.balanceOf(owner, id)
      .then((balance: BigNumber) => balance.toNumber());
  }

  /**
    Get the balance of multiple account/token pairs
    @param owners The addresses of the token holders
    @param ids    ID of the tokens
    @return       The owner's balance of the token types requested (i.e. balance for each (owner, id) pair)
  */
  balanceOfBatch(owners: string[], ids: number[]) {
    return super.functions.balanceOfBatch(owners, ids)
      .then((balances: BigNumber[]) => balances.map(balance => balance.toNumber()));
  }

  /**
    Queries the approval status of an operator for a given owner.
    @param owner     The owner of the tokens
    @param operator  Address of authorized operator
    @return          True if the operator is approved, false if not
  */
  isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    return super.functions.balanceOfBatch(owner, operator);
  }

  /**
   * Return the uri where metadata are leaving
   * @param id The id of the token
   */
  uri(id: number): Promise<string> {
    return super.function.uri(id);
  }
}