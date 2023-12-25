import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotifyService } from '../../services/notify.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;
  isShowingPassword = false;
  formData = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private router: Router,
    private store: Store,
  ) {}

  onSubmit() {
    if (!this.isLoading) {
      this.isLoading = true;
      this.authService.logIn(this.formData.username, this.formData.password).subscribe(
        (res: any) => {
          this.store.dispatch(AuthActions.setAuthData({ accessToken: res.data.accessToken, authUser: res.data.authUser }));
          this.notifyService.notifySuccess('Welcome!');
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        (err) => {
          if (this.isLoading) {
            this.notifyService.notifyError('Incorrect username or password');
            this.isLoading = false;
          }
        },
      );
    }
  }

  toggleIsShowingPassword() {
    this.isShowingPassword = !this.isShowingPassword;
  }
}
