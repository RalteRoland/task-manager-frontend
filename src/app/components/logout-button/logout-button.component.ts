import { Component } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  standalone: false,
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})

export class LogoutButtonComponent {

  constructor(
    private logoutService: LogoutService,
    private router: Router
  ){}

  logout(): void {
    this.logoutService.logout().subscribe({
      next: (response) => {
        console.log("Logout successful!");
        // Navigate to login page
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log("Logout failed:", error);
        // might want to show an error message to the user
      }
    });
  }
}
