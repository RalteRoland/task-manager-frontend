import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']   // <-- Fix here
})
export class AppComponent {
  title = 'task-manager-frontend';
  constructor(public router: Router) {}

  isLoginPage():boolean {
    return this.router.url === '/';
  }

}
