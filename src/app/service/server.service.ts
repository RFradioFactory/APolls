import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { response } from 'express';


var tokenKey: string;

@Injectable({
  providedIn: 'root'
  
})
export class ServerService {
  private baseUrl = 'http://127.0.0.1:8000/'; 
  private fakeUrl = 'https://jsonplaceholder.typicode.com';
  
  
constructor(private http: HttpClient, private router: Router){ }

  getFakePosts(): Observable<any> {
    return this.http.get<any>(`${this.fakeUrl}/posts`);
  }

  getFakeComments(): Observable<any> {
    return this.http.get<any>(`${this.fakeUrl}/comments`);
  }

  getFakeAlbums(): Observable<any> {
    return this.http.get<any>(`${this.fakeUrl}/albums`);
  }

  getFakePhotos(): Observable<any> {
    return this.http.get<any>(`${this.fakeUrl}/photos`);
  }
  getFakeapi(): Observable<any> {
    return this.http.get<any>(`${this.fakeUrl}/posts`);
  }





  fetchData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/data`, data);
  }

  login(email: string, password: string){
    return this.http.post(`${this.baseUrl}api/token/`, { email, password }).pipe(
      tap((response: any) => {
        this.router.navigate(['/main']);
        localStorage.setItem(tokenKey, response.access);
        console.log(response);
      })
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem(tokenKey);
  }

  logout(): void {
    localStorage.removeItem(tokenKey);
    this.router.navigate(['/login']);
  }

  getqa(): any {
    return this.http.options<any>(`${this.baseUrl}enterprises/`);
  }
  // Добавьте другие методы для выполнения различных типов запросов (PUT, DELETE и т.д.)
}
