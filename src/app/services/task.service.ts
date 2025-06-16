import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  createTask(taskData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}`, taskData, { withCredentials: true });
}



}
