import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})

export class NewTaskComponent implements OnInit {
  users: any[] = [];

  task: {
    title: string;
    description: string;
    assigneeId: number | null;
    dueDate: string;
    priority: string;
    reminderOption?: string;
    created_at?: string;

  } = {
    title: '',
    description: '',
    assigneeId: null,
    dueDate: '',
    priority: '',
    reminderOption: '',
    created_at: '',

  };

  attachments: File[] = [];
  subtasks: { title: string; included: boolean }[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Failed to load users', err);
        alert('Could not load users.');
      }
    });
  }

  addSubtask() {
    this.subtasks.push({ title: '', included: true });
  }

  removeSubtask(index: number) {
    this.subtasks.splice(index, 1);
  }

  removeAttachment(fileToRemove: File) {
    this.attachments = this.attachments.filter(file => file !== fileToRemove);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      const existing = this.attachments.map(f => f.name + f.size);
      const newFiles = files.filter(f => !existing.includes(f.name + f.size));
      this.attachments = this.attachments.concat(newFiles);
      input.value = '';
    }
  }

  submitTask(): void {
    if (!this.task.title || !this.task.description || !this.task.assigneeId || !this.task.dueDate) {
      alert('Please fill in all required fields.');
      return;


    }

    const formData = new FormData();
    formData.append('task[title]', this.task.title);
    formData.append('task[description]', this.task.description);
    formData.append('task[assignee_id]', this.task.assigneeId.toString());
    formData.append('task[due_date]', this.task.dueDate);
    formData.append('task[priority]', this.task.priority);

    this.subtasks.forEach((subtask, index) => {
      if (subtask.title.trim() !== '') {
        formData.append(`task[subtasks_attributes][${index}][title]`, subtask.title);
      }
    });

    this.attachments.forEach(file => {
      formData.append('task[attachments][]', file);
    });

    if (this.task.reminderOption && this.task.dueDate) {
      const due = new Date(this.task.dueDate);
      let reminder: Date | null = null;

      switch (this.task.reminderOption) {
        case '10_minutes':
          reminder = new Date(due.getTime() - 10 * 60 * 1000);
          break;
        case '1_hour':
          reminder = new Date(due.getTime() - 60 * 60 * 1000);
          break;
        case '1_day':
          reminder = new Date(due.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '1_week':
          reminder = new Date(due.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
      }

      if (reminder) {
        formData.append('task[reminder_option]', this.task.reminderOption);;
      }
    }



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
