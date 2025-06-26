import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};
  loading = true;
  error = '';


  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDashboard();


  }

  loadDashboard(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        console.log('Dashboard data loaded:', data);
        this.dashboardData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard:', err);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }


  createTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'in_progress': return 'In Progress';
      case 'done': return 'Completed';
      case 'overdue': return 'Overdue';
      case 'open': return 'Open';
      default: return status;
    }
  }


}
