import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']   // <-- Fix here
})
export class AppComponent {
  title = 'task-manager-frontend';
}
