import { Component } from '@angular/core';
import { providers, utils } from 'ethers'
import { MetamaskService } from '@nft/metamask';
@Component({
  selector: 'nft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'marketplace';

  constructor(private metamaskService : MetamaskService) {}

  public async signIn() {
    const data = await this.metamaskService.requestAccount();
    console.log(data);
    
    const message = 'test bruce';
    const signature = await this.metamaskService.signMessage(message);

    const isSigner = this.metamaskService.verifyMessage(message, signature);

    console.log(isSigner);
  }
}


/**
 * import { providers, utils } from 'ethers'
const metaMaskConnectButton = document.getElementById('metamask-button') as HTMLButtonElement | null;
metaMaskConnectButton?.addEventListener('click', () => {
  if (!(window as any).ethereum) {
    console.warn('No Ethereum providers injected in Window!');
    console.warn('Please instal MetaMask!');
    return;
  }
  if (!(window as any).ethereum.isMetaMask) {
    console.warn('Unknown Ethereum providers injected in Window!');
    console.warn('Please instal MetaMask!');
    return;
  }
  (window as any).ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
    console.log('user address', accounts[0]);
    const provider = new providers.Web3Provider((window as any).ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    console.log(signer);
    const message = `I confirm that I'm the owner of this movie.`;
    signer.signMessage(message).then(signature => {
      console.log(signature);
      const extractedAddress = utils.verifyMessage(message, signature);
      console.log(extractedAddress); // should equal accounts[0]
    });
  });
});
 */