import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(): void {
    console.log('🚀 onSubmit called with email:', this.email);
    console.log('🚀 Form valid?', this.email && this.email.length > 0);

    // Check if email is empty
    if (!this.email || this.email.trim() === '') {
      console.log('❌ Email is empty');
      this.errorMessage = 'Please enter an email address';
      return;
    }

    console.log('📡 Making API call...');
    this.loginService.login(this.email).subscribe({
      next: (response: any) => {
        console.log('✅ Login successful', response);
        this.errorMessage = '';
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('❌ Login failed', err);
        console.error('❌ Error details:', err.error);
        console.error('❌ Status:', err.status);
        this.errorMessage = 'Login failed. Please check your email.';
      }
    });
  }
}
