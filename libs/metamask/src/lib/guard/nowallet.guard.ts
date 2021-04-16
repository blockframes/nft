import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  canActivate(): Observable<boolean | UrlTree> {
    networkCheck(this.dialog, this.service);
    return this.service.account$.pipe(map(account => !account ? true : this.router.parseUrl('/')))
  }
}
