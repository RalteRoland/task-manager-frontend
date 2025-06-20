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
    return this.http.get(this.apiUrl, {
      withCredentials: true
    });
  }

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      withCredentials: true
    });
  }

  // Updated method to handle FormData (for file uploads)
  createTask(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, {
      withCredentials: true
      // Don't set Content-Type header - let browser set it automatically for FormData
      // This ensures proper multipart/form-data boundary is set
    });
  }

  // Alternative method for tasks without files (JSON)
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

    return this.http.post(this.apiUrl, payload, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
}
