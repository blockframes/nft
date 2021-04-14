import { Injectable } from '@angular/core';
import { providers, utils } from 'ethers'

@Injectable({ providedIn: 'root' })
export class MetamaskService {

  private provider?: providers.Web3Provider;
  private account: string = '';
  private signer?: providers.JsonRpcSigner;

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
      this.provider = new providers.Web3Provider(this.ethereum);
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });

      if (!!accounts && accounts.length) {
        this.account = accounts[0];
        this.signer = this.provider.getSigner();
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

  /**
   * @TODO Bruce move this to backend functions
   * Check that a message was signed with current account
   * @param message 
   * @param signature 
   * @returns 
   */
  public verifyMessage(message: string, signature: string): boolean {
    const extractedAddress = utils.verifyMessage(message, signature);
    return extractedAddress.toLowerCase() === this.account.toLowerCase();
  }

}
