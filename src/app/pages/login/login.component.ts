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
  step = 1; // 1 = email input, 2 = password input
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  submitEmail(): void {
    if (!this.email.trim()) {
      this.errorMessage = 'Please enter your email.';
      return;
    }

    this.errorMessage = '';
    this.step = 2;
  }

  submitPassword(): void {
    if (!this.password.trim()) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    this.loginService.login(this.email, this.password).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }

  onSubmit(): void {
    this.step === 1 ? this.submitEmail() : this.submitPassword();
  }
}
