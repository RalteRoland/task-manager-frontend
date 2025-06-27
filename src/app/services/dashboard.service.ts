import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    // Sends GET request with cookies (for Devise session authentication)
    return this.http.get(this.apiUrl, { withCredentials: true });
  }
}
