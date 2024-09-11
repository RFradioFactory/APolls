import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { response } from 'express';
import { AuthService } from './auth.service';
import { CreatePollComponent, Question, Poll } from '../components/create-poll/create-poll.component';
import { Enterprises } from '../components/mypolls/mypolls.component';
import {jwtDecode} from 'jwt-decode';



@Injectable({
  providedIn: 'root'
  
})
export class ServerService {
  private baseUrl = 'http://127.0.0.1:8000/'; 
  
  
constructor(private http: HttpClient, private router: Router, private auth: AuthService){ }

  login(email: string, password: string){
    return this.http.post(`${this.baseUrl}api/token/`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('access', response.access);
        localStorage.setItem('refresh', response.refresh);
        localStorage.setItem('email', email);
        console.log(response);
      })
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem('access');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  logout(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
    
  }
 
  getUniversal(address: string): any {
    const accessToken = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
      });
    return this.http.get<any>(`${this.baseUrl}${address}`, {headers});
  }

  isUserEnterprice(): Observable<boolean>{
    return this.getUniversal('users/').pipe(
      map(response => {
        return true;
      }),
      catchError(error => {
        if (error.status === 403) {
          return of(false);
        } else {
          return of(true); 
        }
      })
    );
  }

  isUserAdmin(): Observable<boolean>{
    return this.getUniversal('user-management/').pipe(
      map(response => {
        return true;
      }),
      catchError(error => {
        if (error.status === 403) {
          return of(false);
        } else {
          return of(true); 
        }
      })
    );
  }
  
  addUser(email: string, password: string): any{
    return this.http.post<any>(`${this.baseUrl}user-management/`,{email, password});
  }

  addEnt(name: string, email: string): any{
    const accessToken = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
      });
    return this.http.post<any>(`${this.baseUrl}enterprises/`,{name, email}, {headers});
  }

  addEntUser(email: string, password: string, flag: boolean , name: any): any{
    const accessToken = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
      });
    return this.http.post<any>(`${this.baseUrl}enterprise-users/`,{email: email, password: password, is_enterprise_user: flag, enterprise: name}, {headers});
  }

  addSurvey2(survey: Poll):any{
    const accessToken = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
      });
    return this.http.post<any>(`${this.baseUrl}surveys/`,{"enterprise":survey.enterprise, "title":survey.title, "questions":survey.questions}, {headers})
  }

  addAnswers(userId: string, questionId: string): any{
    const accessToken = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
      });
    return this.http.post<any>(`${this.baseUrl}answers/`,{"user": userId, "question": questionId}, {headers})
  }

  addSelChoices(answerId: string, choiceId: string): any{
    const accessToken = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
      });
    return this.http.post<any>(`${this.baseUrl}selected-choices/`,{"answer": answerId, "choice": choiceId}, {headers})
  }

  refreshToken(): Observable<string | null> {
    const token = this.getAuthToken();
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return of(null);
    }
    if (token){
      return this.http.post<any>(`${this.baseUrl}api/token/refresh/`, { refresh: refreshToken })
        .pipe(
          map((response: any) => {
          localStorage.setItem('access', response.access);
            return response.access;
          }),
          catchError(error => {
            console.error('Error refreshing token:', error);
            return of(null);
          })
        ); 
      }
      else{return of(null);}
    }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: any = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate ? expirationDate < new Date() : false;
  }
  
}


  

