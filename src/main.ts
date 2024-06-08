import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { AuthInterceptor } from './app/service/auth.interceptor';
import { MainPageComponent } from './app/components/main-page/main-page.component';
//git commit -a -m 'some message'
  

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
