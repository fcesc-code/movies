import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_KEY, API_HOST, API_PROVIDER } from '../../../KEYS/API_SECRET_KEYS';

@Injectable()
export class GeneralAPIinterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const GENERAL_KEY: string = API_KEY;
    const GENERAL_HOST: string = API_HOST;
    const GENERAL_PROVIDER: string = API_PROVIDER;

    const backendReq = req.clone({
      headers: req.headers
        .set(`${GENERAL_PROVIDER}-key`, GENERAL_KEY)
        .set(`${GENERAL_PROVIDER}-host`, GENERAL_HOST),
    });
    return next.handle(backendReq);
  }
}
