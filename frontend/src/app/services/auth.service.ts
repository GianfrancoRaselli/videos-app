import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store,
  ) {}

  logIn(username: string, password: string) {
    return this.http.post('authentication/userLogin', { username, password });
  }

  async validateAccessToken() {
    try {
      const res: any = await this.http.get('authentication/validateUserAccessToken').toPromise();
      this.store.dispatch(AuthActions.setAuthData({ accessToken: res.data.accessToken, authUser: res.data.authUser }));
    } catch {
      this.store.dispatch(AuthActions.clearAuthData());
    }
  }

  logOut() {
    this.store.dispatch(AuthActions.clearAuthData());
    this.router.navigate(['/login']);
  }
}
