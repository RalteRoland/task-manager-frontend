import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
    console.log('🔥 Fetching dashboard data...');
    return this.http.get(`${this.baseUrl}/dashboard`, {
      withCredentials: true
    });
  }
}
