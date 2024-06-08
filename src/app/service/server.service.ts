import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { response } from 'express';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
  
})
export class ServerService {
  private baseUrl = 'http://127.0.0.1:8000/'; 
  
  
constructor(private http: HttpClient, private router: Router, private auth: AuthService){ }
  /*private tokenKey = 'authToken'

  fetchData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/data`, data);
  }*/

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

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
 
  getUniversal(address: string): any {
    const accessToken = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
      });
    return this.http.get<any>(`${this.baseUrl}${address}`, {headers});
  }

  addUser(email: string, password: string, isEnterpr: boolean, name: string): any{
    let body = {email: email, password: password};
    
    console.log(body);
    let e: string = '11@yandex.ru';
    let pas: string = '1234';
    let is: boolean = false;
    let aa: boolean = false;
    return this.http.post<any>(`${this.baseUrl}users/`,{body});
  }

  addSurvey(enterprise: any, title: any): any{
    const accessToken = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
      });
    return this.http.post<any>(`${this.baseUrl}surveys`,{enterprise: enterprise, title: title}, {headers});
  }
  
  // Добавьте другие методы для выполнения различных типов запросов (PUT, DELETE и т.д.)
}
