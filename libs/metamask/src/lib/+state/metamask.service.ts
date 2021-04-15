import { Injectable } from '@angular/core';
import { providers } from 'ethers'

@Injectable({ providedIn: 'root' })
export class MetamaskService {

  private account: string = '';
  signer?: providers.JsonRpcSigner;

  private get ethereum() {
    if (typeof window !== 'undefined' && 'ethereum' in window) {
      const ethereum = (window as any).ethereum;
      if (!ethereum) throw new Error('no-web3-provider');
      if (!ethereum.isMetaMask) throw new Error('not-metamask');
      return ethereum;
    }
  }

  async getAccount() {
    if (this.account) return this.account;

    try {
      const provider = new providers.Web3Provider(this.ethereum);
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });

      if (!!accounts && accounts.length) {
        this.account = accounts[0];
        this.signer = provider.getSigner();
      }
    } catch (err) {
      console.log(err.message);
    }
    return this.account;
  }

  /**
   * Check if ETH account is already setted
   * @returns boolean
   */
  public async hasAccount(): Promise<boolean> {
    const account = await this.getAccount();
    return !!account;
  }

  /**
   * Will show MetaMask popin
   * @returns first account found in metamask
   */
  public async requestAccount(): Promise<string> {
    if (!!this.account) return this.account;
    try {
      const accounts: any[] = await this.ethereum.request({ method: 'eth_requestAccounts' });
      if (!!accounts && accounts.length) {
        this.account = accounts[0];
        this.signer = new providers.Web3Provider(this.ethereum).getSigner();
        return this.account;
      } else {
        throw new Error('no-account');
      }
    } catch (err) {
      throw new Error('no-provider');
    }
  }

  /**
   *
   * @param message
   * @returns string signature of a signed message
   */
  public signMessage(message: string): Promise<string> {
    if (!!this.signer) {
      return this.signer.signMessage(message);
    } else {
      throw new Error('signer-not-defined');
    }
  }
}
