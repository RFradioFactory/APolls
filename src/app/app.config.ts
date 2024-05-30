import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './service/auth.interceptor';
import { MainPageComponent } from './components/main-page/main-page.component';

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    provideHttpClient(),
    MainPageComponent,
    provideRouter(routes), provideClientHydration(),
    {provide:
      HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}

  ]
};
