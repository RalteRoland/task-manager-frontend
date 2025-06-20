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
    status: 'in_progress'  // Changed from 'pending' to 'in_progress'
  };

  attachments: File[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.attachments = Array.from(input.files);
    }
  }

  submitTask(): void {
    if (
      !this.task.title ||
      !this.task.description ||
      !this.task.assigneeId ||
      !this.task.dueDate
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('task[title]', this.task.title);
    formData.append('task[description]', this.task.description);
    formData.append('task[assignee_id]', this.task.assigneeId.toString());
    formData.append('task[due_date]', this.task.dueDate);
    formData.append('task[status]', this.task.status);

    this.attachments.forEach(file => {
      formData.append('task[attachments][]', file); //
    });

    this.taskService.createTask(formData).subscribe({
      next: (response: any) => {
        console.log('Task created:', response);
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Failed to create task:', error);
        alert('Failed to create task. Please try again.');
      }
    });
  }
}
