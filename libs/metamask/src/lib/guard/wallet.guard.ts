import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { MetamaskService } from '../+state/metamask.service';
import { MatDialog } from '@angular/material/dialog';
import { networkCheck } from './guard.helpers';

@Injectable({
  providedIn: 'root'
})
export class EthereumWalletGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: MetamaskService,
    private dialog: MatDialog,
  ) { }

  async canActivate(): Promise<boolean | UrlTree> {
    networkCheck(this.dialog, this.service);
    return this.service.hasAccount()
    .then(hasAccount => hasAccount || this.router.parseUrl('/signin'))
    .catch(_ => this.router.parseUrl('/signin'));
  }
}
