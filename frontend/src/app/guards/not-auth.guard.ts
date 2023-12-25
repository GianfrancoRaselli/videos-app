import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../store/auth.state';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AuthState>,
  ) {}

  canActivate() {
    return this.store.pipe(
      select((state) => state),
      map((state: any) => {
        if (!state.auth.accessToken) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }),
    );
  }
}
