import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Contract, Event, BigNumber } from 'ethers';
import { MetamaskService } from './metamask.service';
import env from '@nft/env';
import abi from '@nft/model/erc1155.json';
import { ERC1155_Token } from '@nft/model/erc1155';
import { Title } from '@nft/model/title';
import { take } from 'rxjs/operators';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

@Injectable({ providedIn: 'root' })
export class ERC1155 extends Contract {
  metamask: MetamaskService

  constructor(metamask: MetamaskService, private db: AngularFireDatabase) {
    super(env.eth.erc1155, abi, metamask.signer);
    if (!metamask.signer) throw new Error('ERC1155 requires a signer');
    this.metamask = metamask;
  }

  async getTokens(account: string): Promise<ERC1155_Token[]> {
    const ids = await this.getTokenIds(account);
    const promises = ids.map(async (id: number) => {
      const [balance, meta] = await Promise.all([
        this.balanceOf(account, id),
        this.getMeta(id)
      ]);
      return { id, account, balance, meta };
    });
    const tokens = await Promise.all(promises);
    return tokens.filter(token => token.balance);
  }

  async getAllTokens(): Promise<Title[]> {
    const ids = await this.getTokenIds();
    const promises = ids.map((id: number) => this.getMeta(id));
    return await Promise.all(promises);
  }

  getMeta(id: number): Promise<Title> {
    return this.uri(id)
      .then(uri => fetch(uri))
      .then(res => res.json());
  }

  async getTokenIds(account?: string) {
    const filter = this.filters.TransferSingle(null, null, !!account ? account : null);
    const events = await this.queryFilter(filter);
    const ids = events.map((event: Event): number => (event.args![3] as BigNumber).toNumber());
    return Array.from(new Set(ids));
  }

  /**
    Get the balance of an account's tokens.
    @param owner  The address of the token holder
    @param id     ID of the token
    @return       The owner's balance of the token type requested
  */
  balanceOf(owner: string, id: number) {
    return this.functions.balanceOf(owner, id)
      .then(([balance]: [BigNumber]) => balance.toNumber());
  }

  /**
    Get the balance of multiple account/token pairs
    @param owners The addresses of the token holders
    @param ids    ID of the tokens
    @return       The owner's balance of the token types requested (i.e. balance for each (owner, id) pair)
  */
  balanceOfBatch(owners: string[], ids: number[]) {
    return this.functions.balanceOfBatch(owners, ids)
      .then((balances: BigNumber[]) => balances.map(balance => balance.toNumber()));
  }

  /**
    Queries the approval status of an operator for a given owner.
    @param owner     The owner of the tokens
    @param operator  Address of authorized operator
    @return          True if the operator is approved, false if not
  */
  isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    return this.functions.balanceOfBatch(owner, operator);
  }

  /**
   * Return the uri where metadata are leaving
   * @param id The id of the token
   */
  uri(id: number): Promise<string> {
    return this.functions.uri(id);
  }

  /**
   * Mint a token
   * @param quantity the number of supply
   */
  async mint(quantity: number, id: string) {
    const to = await this.metamask.signer?.getAddress();

    try {
      const tx = await this.functions.mint(to, id, quantity, []);
      return tx.wait(1) as Promise<TransactionReceipt>;
    } catch (err) {
      console.error(err);
    }
    return;
  }

  async getLastId() {
    const lastId = await this.db.object(`store/lastId`).valueChanges().pipe(take(1)).toPromise() as number;
    if (lastId === undefined) throw new Error('Last ID not found in db, please check the DB!');

    return lastId
  }

  async getNextId() {
    const lastId = await this.getLastId();
    const nextId = lastId + 1;

    const nextToken = await this.db.object(`titles/${nextId}`).valueChanges().pipe(take(1)).toPromise() as Title;

    if (!!nextToken) throw new Error(`Next token ID should be #${nextId}, but a token whit this ID already exist!`);

    return nextId;
  }

  async minterRole() {
    const role = await this.functions.MINTER_ROLE();
    return role as string;
  }
}
