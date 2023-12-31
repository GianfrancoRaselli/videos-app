import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { getAccessToken, getAuthUser } from '../../store/auth.selectors';
import { User } from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  accessToken = '';
  authUser: User | null = null;
  isUploadVideoModalVisible = false;

  constructor(
    private authService: AuthService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.select(getAccessToken).subscribe((accessToken) => {
      this.accessToken = accessToken;
    });
    this.store.select(getAuthUser).subscribe((authUser) => {
      this.authUser = authUser;
    });
  }

  logOut() {
    this.authService.logOut();
  }
}
