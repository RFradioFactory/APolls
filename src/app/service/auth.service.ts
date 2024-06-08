import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/';
  private refreshTokenInProgress = false;
  private accessTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) { }


  login(email: string, password: string){
    return this.http.post(`${this.apiUrl}api`, { email, password }).pipe(
      tap((response: any) => {
        //this.router.navigate(['/main']);
        localStorage.setItem('access', response.access);
        localStorage.setItem('refrash', response.refrash);
        console.log(response);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refrash');
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access', accessToken);
    localStorage.setItem('refresh', refreshToken);
  }

  refreshAccessToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return this.accessTokenSubject.asObservable().pipe(
        switchMap(token => {
          if (token) {
            return new Observable(observer => observer.next(token));
          } else {
            return throwError('No access token available');
          }
        })
      );
    } else {
      this.refreshTokenInProgress = true;
      this.accessTokenSubject.next(null);

      return this.http.post<any>(`${this.apiUrl}api/token/refresh`, {
        refresh_token: this.getRefreshToken()
      }).pipe(
        switchMap(response => {
          const newAccessToken = response.access;
          const newRefreshToken = response.refresh;
          this.saveTokens(newAccessToken, newRefreshToken);
          this.accessTokenSubject.next(newAccessToken);
          this.refreshTokenInProgress = false;
          return new Observable(observer => observer.next(newAccessToken));
        }),
        catchError((error: HttpErrorResponse) => {
          this.refreshTokenInProgress = false;
          return throwError(error);
        })
      );
    }
  }
}
