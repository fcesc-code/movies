import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_GENERAL_KEYS } from '../../../KEYS/API_SECRET_KEYS';

@Injectable()
export class GeneralAPIinterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const GENERAL_KEY: string = API_GENERAL_KEYS.key;
    const GENERAL_HOST: string = API_GENERAL_KEYS.host;
    const GENERAL_PROVIDER: string = API_GENERAL_KEYS.provider;

    const backendReq = req.clone({
      headers: req.headers
        .set(`${GENERAL_PROVIDER}-key`, GENERAL_KEY)
        .set(`${GENERAL_PROVIDER}-host`, GENERAL_HOST),
    });
    return next.handle(backendReq);
  }
}
