import { Injectable } from '@angular/core';
import { providers, utils } from 'ethers'

export interface ServiceResponse<T> {
  statut: boolean,
  message?: string,
  data?: T
}

@Injectable({ providedIn: 'root' })
export class MetamaskService {

  private metamaskDom = (window as any).ethereum;
  private provider: providers.Web3Provider;
  private account: string = '';

  constructor() {
    this.provider = new providers.Web3Provider(this.metamaskDom);
  }

  /**
   * Check if ETH account is already setted
   * @returns boolean
   */
  public async hasAccount(): Promise<boolean> {
    const accounts: any[] = await this.metamaskDom.request({ method: 'eth_accounts' });
    return !!accounts && accounts.length ? true : false;
  }

  /**
   * 
   * @returns first account found in metamask
   */
  public async requestAccount(): Promise<ServiceResponse<string>> {
    if (!!this.account) { return { statut: true, data: this.account } };

    if (!this.metamaskDom) {
      console.warn('No Ethereum providers injected in Window!');
      return { statut: false, message: 'Please install MetaMask!' };
    }

    if (!this.metamaskDom.isMetaMask) {
      console.warn('Unknown Ethereum providers injected in Window!');
      return { statut: false, message: 'Please install MetaMask!' };
    }

    const accounts: any[] = await this.metamaskDom.request({ method: 'eth_requestAccounts' });

    if (!!accounts && accounts.length) {
      this.account = accounts[0];
      return { statut: true, data: this.account };
    } else {
      return { statut: false, message: 'Unknown error' };
    }
  }

  /**
   * 
   * @param message 
   * @returns string signature of a signed message
   */
  public signMessage(message: string): Promise<string> {
    const signer = this.provider.getSigner();
    return signer.signMessage(message);
  }

  /**
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
