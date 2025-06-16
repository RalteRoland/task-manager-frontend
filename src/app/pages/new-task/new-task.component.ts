import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service'; // Adjust path if needed

@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent {
  users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  task: {
    title: string;
    description: string;
    assigneeId: number | null;
    dueDate: string;
    status: string;
  } = {
    title: '',
    description: '',
    assigneeId: null,
    dueDate: '',
    status: 'pending'
  };

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  submitTask(): void {
    if (
      !this.task.title ||
      !this.task.description ||
      !this.task.assigneeId ||
      !this.task.dueDate ||
      !this.task.status
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    this.task.assigneeId = Number(this.task.assigneeId);

    this.taskService.createTask(this.task).subscribe({
      next: (response: any) => {
        console.log('Task created:', response);
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      error: (error: any) => {
        console.error('Failed to create task:', error);
        alert('Failed to create task. Please try again.');
      }
    });
  }
}
