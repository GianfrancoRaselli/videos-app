import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../store/auth.state';
import { Observable, map, switchMap } from 'rxjs';
import { backendUrl } from '../ref';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select((state) => state),
      map((state: any) => {
        const accessToken = state.auth.accessToken;
        request = request.clone({ url: `${backendUrl}${request.url}` });
        if (accessToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
        return request;
      }),
      switchMap((req) => next.handle(req)),
    );
  }
}
