import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetamaskService } from '../+state/metamask.service';

@Injectable({
  providedIn: 'root'
})
export class NoEthereumWalletGuard implements CanActivate {
  constructor(
    private router: Router,
    private service: MetamaskService,
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.service.account$.pipe(map(account => !account ? true : this.router.parseUrl('/')))
  }
}
