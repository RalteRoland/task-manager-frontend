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
  comments: any[] = [];
  loadingMore = false;
  allCommentsLoaded = false;
  lastCommentOrder: number | null = null;
  newComment: string = '';
  comment: any[] = [];
  isMarkingComplete = false;
  loadedCommentCount: number = 0;
  totalCommentCount: number = 0;
  hasMoreComments: boolean = false;
  loadingComments: boolean = false;
  loadedComments: any[] = [];
  visibleCount: number = 3;



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
          this.totalCommentCount = data.total_comments;
          this.loadLatestComments();
          console.log('Task loaded:', data);
        },
        error: (error) => {
          console.error('Failed to load task:', error);
        }
      });
    }
  }

  loadLatestComments(): void {
    this.loadingComments = true;

    this.http.get<any[]>('http://localhost:3000/api/comments', {
      params: {
        task_id: this.task.id
      },
      withCredentials: true
    }).subscribe({
      next: (comments) => {
        this.loadedComments = comments; // Must be sorted DESC by backend
        this.hasMoreComments = comments.length > 3;
        this.loadingComments = false;
      },
      error: (err) => {
        console.error('Failed to load comments', err);
        this.loadingComments = false;
      }
    });
  }




  loadMore(): void {
    this.visibleCount = this.loadedComments.length;
    this.hasMoreComments = false;
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
    const content = this.newComment.trim();
    if (!content) return;

    const httpOptions = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    this.http.post<any>('http://localhost:3000/api/comments', {
      comment: {
        content,
        task_id: this.task.id
      }
    }, httpOptions).subscribe({
      next: (comment) => {
        this.loadedComments.unshift(comment); // latest on top
        this.visibleCount++; // show it immediately
        this.newComment = '';
      },
      error: (err) => {
        console.error('Error posting comment:', err);
      }
    });
  }



  loadMoreComments(): void {
    const beforeOrder = this.loadedComments[0]?.comment_order;

    this.loadingComments = true;

    this.http.get<any[]>('http://localhost:3000/api/comments', {
      params: {
        task_id: this.task.id,
        per_page: 3,
        before_order: beforeOrder
      },
      withCredentials: true
    }).subscribe({
      next: (moreComments) => {
        this.loadedComments = [...moreComments.reverse(), ...this.loadedComments];
        this.hasMoreComments = this.loadedComments.length < this.totalCommentCount;
        this.loadingComments = false;
      },
      error: (err) => {
        console.error('Failed to load more comments', err);
        this.loadingComments = false;
      }
    });
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // prevent newline
      this.submitComment();
    }
  }

  deleteComment(commentId: number): void {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    this.http.delete(`http://localhost:3000/api/comments/${commentId}`, {
      withCredentials: true
    }).subscribe({
      next: () => {
        // Remove the comment from loadedComments
        this.loadedComments = this.loadedComments.filter(c => c.id !== commentId);
        this.visibleCount--; // keep count correct
      },
      error: (err) => {
        console.error('Failed to delete comment:', err);
      }
    });
  }



  onCommentTyping(): void {
    if (this.task.status?.name === 'open') {
      this.taskService.updateTask(this.task.id, { task: { status_id: 2 } }).subscribe({
        next: (updated) => {
          this.task.status = updated.status;
          this.task.display_status = updated.display_status;
          console.log('Status auto-updated to in_progress due to typing.');
        },
        error: (err) => {
          console.error('Failed to auto-update task status:', err);
        }
      });
    }
  }

}
