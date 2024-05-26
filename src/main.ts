import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/service/auth.interceptor';


  

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
