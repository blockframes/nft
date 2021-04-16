import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { MetamaskService } from '../+state/metamask.service';
import { networkCheck } from './guard.helpers';

@Injectable({
  providedIn: 'root'
})
export class NoEthereumWalletGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: MetamaskService,
    private dialog: MatDialog,
  ) { }

  async canActivate(): Promise<boolean | UrlTree> {
    await networkCheck(this.dialog, this.service);
    return this.service.hasAccount()
      .then(hasAccount => !hasAccount || this.router.parseUrl('/'))
      .catch(_ => this.router.parseUrl('/'));
  }
}
