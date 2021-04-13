import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { MetamaskService } from '../+state/metamask.service';

@Injectable({
  providedIn: 'root'
})
export class EthereumWalletGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: MetamaskService,
  ) { }

  async canActivate(): Promise<boolean | UrlTree> {
    if (await this.service.hasAccount()) {
      return true;
    } else {
      return this.router.parseUrl('/sign-in');
    }
  }
}
