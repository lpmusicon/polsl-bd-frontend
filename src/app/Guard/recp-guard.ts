import { Injectable } from '@angular/core';

import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { DbCommunicationService } from '../db-communication.service';

@Injectable()
export class RecpGuard implements CanActivate, CanActivateChild {
  constructor(
    private _db: DbCommunicationService,
    private router: Router
  ) {

  }

  public canActivate(): boolean {
    if (this._db.getUser().role == "RECP") {
      return true;
    }
    
    console.warn("Unathorized user attempted to use recp path");
    this.router.navigate(['/']);
    return false;
  }

  public canActivateChild(): boolean {
    return this.canActivate();
  }
}