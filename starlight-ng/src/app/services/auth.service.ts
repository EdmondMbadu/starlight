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

  private loggedIn  = false;
  private tokenKey = 'my-auth-token';

  constructor(private http: HttpClient) {
    this.loggedIn  = !!localStorage.getItem('access_token');
  }

  test(): string {
    return 'working';
  }

  isLoggedIn(): boolean {
    // return this.loggedIn;
    const token = localStorage.getItem(this.tokenKey); // Get token from local storage
    return token != null;
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loggedIn  = true;
    return this.http.post<any>('/api/login', {email, password}, {headers});
    // .subscribe(
    //   (response: any) => {
    //     const token = response.token;
    //     localStorage.setItem(this.tokenKey, token);
    //   },
    //   (error: any) => {
    //     console.error('Error logging in:', error);
    //   }
    // );
  }

  register(email: string, first:string, last:string, password: string): Observable<any> {
    let url: string = `${this.BASE_URL}/register`; //`${this.apiBaseUrl}/register`
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('/api/register', { email, first, last, password }, { headers });
  }

  logout(): Observable<any> {
    localStorage.removeItem(this.tokenKey);
    return this.http.get<any>('/api/logout');
  }

  getData(): Observable<any> {
    return this.http.get<any>('/api/data');
  }
}