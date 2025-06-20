import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-view-task',
  standalone: false,
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  task: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');

    if (taskId) {
      this.taskService.getTask(taskId).subscribe({
        next: (data) => {
          this.task = data;
          console.log('Task loaded:', data); // ✅ Check console
        },
        error: (error) => {
          console.error('Failed to load task:', error);
        }
      });
    }
  }
}
