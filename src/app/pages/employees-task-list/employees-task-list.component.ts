import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-employees-task-list',
  standalone: false,
  templateUrl: './employees-task-list.component.html',
  styleUrl: './employees-task-list.component.css'
})
export class EmployeesTaskListComponent implements OnInit {
  employees: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Failed to load employees:', err);
      }
    });
  }
}
