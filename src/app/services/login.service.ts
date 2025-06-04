import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:3000'; // Rails API URL

  constructor(private http: HttpClient) { }

  login(email: string): Observable<any> {
    console.log('🔥 Login service called with email:', email);
    const payload = { user: { email } };
    return this.http.post(`${this.baseUrl}/users/sign_in`, payload, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true // Important for Devise sessions
    });
  }
}
