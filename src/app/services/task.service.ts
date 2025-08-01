import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';
  private httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getPriorities(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/priorities', { withCredentials: true });
  }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/users', { withCredentials: true });
  }

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/users', { withCredentials: true });
  }

  createTask(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, { withCredentials: true });
  }

  updateTask(id: number, data: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/api/tasks/${id}`, data, this.httpOptions);
  }

  updateSubtask(subtaskId: number, completed: boolean): Observable<any> {
    const payload = { subtask: { completed } };
    return this.http.patch(`http://localhost:3000/api/subtasks/${subtaskId}`, payload, this.httpOptions);
  }

  createTaskWithoutFiles(taskData: any): Observable<any> {
    const payload = {
      task: {
        title: taskData.title,
        description: taskData.description,
        assignee_id: taskData.assigneeId,
        due_date: taskData.dueDate,
        status: taskData.status
      }
    };
    return this.http.post(this.apiUrl, payload, this.httpOptions);
  }

  markAsComplete(taskId: number) {
    return this.http.patch<any>(`http://localhost:3000/api/tasks/${taskId}/mark_complete`, {}, this.httpOptions);
  }
}
