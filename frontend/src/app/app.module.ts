import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { localStorageAwareReducer } from './store/auth.reducer';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BaseUrlInterceptor } from './services/http-interceptor';
import { AppComponent } from './app.component';

// components
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { VideoCardComponent } from './views/home/video-card/video-card.component';
import { VideoComponent } from './views/video/video.component';

// directives
import { OutsideClickDirective } from './directives/outside-click.directive';

@NgModule({
  declarations: [
    // components
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SpinnerComponent,
    UploadVideoComponent,
    VideoCardComponent,
    VideoComponent,
    // directives
    OutsideClickDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ auth: localStorageAwareReducer }),
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
