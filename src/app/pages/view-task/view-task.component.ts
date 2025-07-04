import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-task',
  standalone: false,
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  task: any;
  newComment: string = '';
  isMarkingComplete = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private http: HttpClient
  ) {}

  user = {
    avatarUrl: '',
    name: 'Anonymous'
  };

  getReminderLabel(option: string): string {
    switch (option) {
      case '10_minutes': return '10 minutes before';
      case '1_hour': return '1 hour before';
      case '1_day': return '1 day before';
      case '1_week': return '1 week before';
      default: return '';
    }
  }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.taskService.getTask(taskId).subscribe({
        next: (data) => {
          this.task = data;
          console.log('Task loaded:', data);
        },
        error: (error) => {
          console.error('Failed to load task:', error);
        }
      });
    }
  }

  markAsComplete(): void {
    this.isMarkingComplete = true;
    this.taskService.markAsComplete(this.task.id).subscribe({
      next: (updated: any) => {
        if (updated?.status?.name === 'done') {
          this.task.status = updated.status;
          this.task.display_status = updated.display_status;
          console.log('Task marked as complete.');
        } else {
          alert('Status not updated to done.');
        }
        this.isMarkingComplete = false;
      },
      error: (err) => {
        console.error('Failed to mark task as complete', err);
        alert('Failed to complete the task.');
        this.isMarkingComplete = false;
      }
    });
  }



  updateSubtaskCompletion(subtask: any): void {
    this.taskService.updateSubtask(subtask.id, subtask.completed).subscribe({
      next: () => {
        console.log(`Subtask "${subtask.title}" marked as ${subtask.completed ? 'complete' : 'incomplete'}`);

        if (this.task.status?.name === 'open') {
          this.taskService.updateTask(this.task.id, { task: { status_id: 2 } }).subscribe({
            next: updated => {
              this.task.status = updated.status;
              this.task.display_status = updated.display_status; // 👈 Add this
              console.log('Task status updated to in_progress due to subtask activity.');
            }
          });
        }
      },
      error: err => {
        console.error('Failed to update subtask', err);
      }
    });
  }


  submitComment(): void {
    if (!this.newComment.trim()) return;

    this.http.post<Comment>('http://localhost:3000/comments', {
      comment: {
        content: this.newComment,
        task_id: this.task.id
      }
    }, { withCredentials: true }).subscribe({
      next: (comment) => {
        this.task.comments.push(comment);
        this.newComment = '';
      },
      error: (err) => console.error('Error posting comment:', err)
    });
  }

  onCommentTyping(): void {
    if (this.task.status?.name === 'open') {
      this.taskService.updateTask(this.task.id, { task: { status_id: 2 } }).subscribe({
        next: (updated) => {
          this.task.status = updated.status;
          this.task.display_status = updated.display_status;
          console.log('Status updated to in_progress due to typing comment.');
        },
        error: (err) => {
          console.error('Failed to update status:', err);
        }
      });
    }
  }
}
