import { Injectable } from '@angular/core';

import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { DbCommunicationService } from '../db-communication.service';

@Injectable()
export class RouteGuard implements CanActivate, CanActivateChild {
  constructor(
    private _db: DbCommunicationService,
    private router: Router
  ) {

  }

  private checkTokenState(): boolean {
    return typeof this._db.getUser() !== typeof undefined && this._db.getUser().token !== null && this._db.getUser().token.length !== 0
  }

  public canActivate(): boolean {
    if (this.checkTokenState()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }

  public canActivateChild(): boolean {
    return this.canActivate();
  }
}