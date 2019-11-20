import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { DbCommunicationService } from './db-communication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private _db: DbCommunicationService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (typeof this._db.getUser() !== typeof undefined) {
            console.log("Auth Intercept token: ", this._db.getUser().token);
            if (this._db.getUser().token !== null) {
                const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${this._db.getUser().token}`) });
                return next.handle(authReq);
            }
        }
        return next.handle(req);
    }
}