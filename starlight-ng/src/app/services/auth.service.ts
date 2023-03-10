import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiBaseUrl = 'http://localhost:5000';
  private BASE_URL: string = 'http://localhost:5000';

  private registerUrl = 'http://localhost:5000/api/register';
  private logoutUrl = 'http://localhost:5000/api/logout';
  private dataUrl = 'http://localhost:5000/api/data';

  constructor(private http: HttpClient) {}

  test(): string {
    return 'working';
  }

  private isLoggedIn = false;
  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post<any>(url, {email, password});
    // return this.http.post<any>(url, {email, password}, {headers});
    // return this.http.post<any>(this.loginUrl, {email, password}, {headers});
    this.isLoggedIn = true;
    return this.http.post<any>('/api/login', {email, password}, {headers});
  }

  register(email: string, first:string, last:string, password: string): Observable<any> {
    let url: string = `${this.BASE_URL}/register`; //`${this.apiBaseUrl}/register`
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // return this.http.post(url, {email, first, last, password});
    // return this.http.post<any>(this.registerUrl, { email, first, last, password }, { headers });
    return this.http.post<any>('/api/register', { email, first, last, password }, { headers });
  }

  logout(): Observable<any> {
    // return this.http.get<any>(this.logoutUrl);
    this.isLoggedIn = false;
    return this.http.get<any>('/api/logout');
  }

  getData(): Observable<any> {
    // return this.http.get<any>(this.dataUrl);
    return this.http.get<any>('/api/data');
  }
}
