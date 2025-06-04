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
  step: number = 1;           // Step 1 = email, Step 2 = password
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  submitEmail(): void {
    if (!this.email.trim()) {
      this.errorMessage = 'Please enter your email.';
      return;
    }

    // Proceed to step 2 (password input)
    this.errorMessage = '';
    this.step = 2;
  }

  submitPassword(): void {
    if (!this.password.trim()) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    this.loginService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        this.errorMessage = '';
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }

  onSubmit(): void {
    if (this.step === 1) {
      this.submitEmail();
    } else if (this.step === 2) {
      this.submitPassword();
    }
  }

}
