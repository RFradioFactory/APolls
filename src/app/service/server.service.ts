import { Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
  
})
export class ServerService {
  private baseUrl = 'http://127.0.0.1:8000/'; // Замените на адрес вашего сервера
  private tokenKey = 'authToken';
  
  
constructor(private http: HttpClient){ }
  fetchData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/data`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/data`, data);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}api/token/`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.access);
      })
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
  // Добавьте другие методы для выполнения различных типов запросов (PUT, DELETE и т.д.)
}
