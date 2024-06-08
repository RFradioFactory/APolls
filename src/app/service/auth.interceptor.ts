// auth.interceptor.ts
/*import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerService } from './server.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private serverService: ServerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.serverService.getAuthToken();

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(request);
  }
}*/
/*
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    let authReq = req;

    if (accessToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshAccessToken().pipe(
            switchMap((newAccessToken: string) => {
              const newAuthReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newAccessToken}`)
              });
              return next.handle(newAuthReq);
            }),
            catchError(err => {
              return throwError(err);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
*/
// auth.interceptor.ts
/*import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';
import { ServerService } from './server.service';


export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  
  //const cookieService = inject(CookieService); // получаем CookieService
  //const token = cookieService.get('your-token'); // получаем токен из cookies
  const ss = inject(ServerService)
  const token = ss.getAuthToken();

  const clonedReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  return next(clonedReq); // передаем измененный или оригинальный запрос
};
*/