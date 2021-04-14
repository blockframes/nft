import { Injectable } from '@angular/core';
import { Contract, EventFilter, Transaction } from 'ethers';
import { environment } from '../environments/environment';
import * as abi from '../assets/abis/erc1155.json';

interface ERC1155_Event {
  TransferSingle: (operator: string, from: string, to: string, id: number, value: number) => void;
  TransferBatch: (operator: string, from: string, to: string, ids: number[], values: number[]) => void;
  ApprovalForAll: (owner: string, operator: string, approved: boolean) => void;
  URI: (value: string, id: number) => void;
}


@Injectable({ providedIn: 'root' })
export class ERC1155 extends Contract {

  constructor(metamask: MetaMaskService) {
    if (!metamask.signer) throw new Error('ERC1155 requires a signer');
    super(environment.erc1155, abi, metamask.signer);
  }

  on<K extends keyof ERC1155_Event>(event: K, listener: ERC1155_Event[K]) {
    return super.on(event, listener)
  }
  off<K extends keyof ERC1155_Event>(event: K, listener: ERC1155_Event[K]) {
    return super.off(event, listener)
  }
  once<K extends keyof ERC1155_Event>(event: K, listener: ERC1155_Event[K]) {
    return super.once(event, listener)
  }
  removeAllListeners(event?: Extract<keyof ERC1155_Event, string> | EventFilter) {
    return super.removeAllListeners(event);
  }
  
  /**
    Transfers `value` amount of an `id` from the `from` address to the `to` address specified (with safety call).
    @param from    Source address
    @param to      Target address
    @param id      ID of the token type
    @param value   Transfer amount
    @param data    Additional data with no specified format, MUST be sent unaltered in call to `onERC1155Received` on `to`
  */
  safeTransferFrom(from: string, to: string, id: number, value: number, data: string): Promise<Transaction> {
    return super.safeBatchTransferFrom(from, to, id, value, data);
  }

  /**
    Transfers `values` amount(s) of `ids` from the `from` address to the `to` address specified (with safety call).
    @param from    Source address
    @param to      Target address
    @param ids     IDs of each token type (order and length must match values array)
    @param values  Transfer amounts per token type (order and length must match ids array)
    @param data    Additional data with no specified format, MUST be sent unaltered in call to the `ERC1155TokenReceiver` hook(s) on `to`
  */
  safeBatchTransferFrom(from: string, to: string, ids: number[], values: number[], data: string): Promise<Transaction> {
    return super.safeBatchTransferFrom(from, to, ids, values, data);
  }

  /**
    Enable or disable approval for a third party ("operator") to manage all of the caller's tokens.
    @param operator  Address to add to the set of authorized operators
    @param approved  True if the operator is approved, false to revoke approval
  */
  setApprovalForAll(operator: string, approved: boolean): Promise<Transaction> {
    return super.setApprovalForAll(operator, approved);
  }

  /**
    Get the balance of an account's tokens.
    @param owner  The address of the token holder
    @param id     ID of the token
    @return       The owner's balance of the token type requested
  */
  balanceOf(owner: string, id: number): Promise<number> {
    return super.functions.balanceOf(owner, id);
  }

  /**
    Get the balance of multiple account/token pairs
    @param owners The addresses of the token holders
    @param ids    ID of the tokens
    @return       The owner's balance of the token types requested (i.e. balance for each (owner, id) pair)
  */
  balanceOfBatch(owners: string[], ids: number[]): Promise<number[]> {
    return super.functions.balanceOfBatch(owners, ids);
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
}