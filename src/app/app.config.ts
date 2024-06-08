import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler,provideHttpClient, withInterceptors } from '@angular/common/http';
//import { AuthInterceptor } from './service/auth.interceptor';
import { AuthService } from './service/auth.service';
import { MainPageComponent } from './components/main-page/main-page.component';
//import { CookieService } from 'ngx-cookie-service';


export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    provideHttpClient(),
    MainPageComponent,
    provideRouter(routes), provideClientHydration(),
    AuthService,
    HttpClientModule,
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    provideHttpClient(withInterceptors(
      [AuthInterceptor]
  )),*/
  ]
};
