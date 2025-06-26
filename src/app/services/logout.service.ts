import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.apiUrl}/users/sign_out`, {
      headers,
      responseType: 'text' as 'json' // This handles non-JSON responses
    });
  }
}
