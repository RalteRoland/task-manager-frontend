import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface DashboardData {
  tasks_count: number;
  pending_count: number;
  in_progress_count: number;
  done_count: number;
  upcoming_tasks: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardData> {
    console.log('🔥 Fetching dashboard data from:', `${this.baseUrl}/`);
    return this.http.get<DashboardData>(`${this.baseUrl}/`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Dashboard API Error:', error);
        console.error('Status:', error.status);
        console.error('URL:', error.url);
        console.error('Message:', error.message);
        return throwError(() => error);
      })
    );
  }
}
