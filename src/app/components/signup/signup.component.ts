import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signupData = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  roles: string[] = [];
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.http.get<string[]>('http://localhost:3000/api/roles', { withCredentials: true })
      .subscribe(
        (data) => this.roles = data,
        (error) => console.error('Failed to load roles:', error)
      );
  }

  onSubmit(): void {
    const payload = {
      name: this.signupData.name,
      email: this.signupData.email,
      password: this.signupData.password,
      role: this.signupData.role
    };

    this.http.post('http://localhost:3000/users', payload, { withCredentials: true })
      .subscribe({
        next: () => {
          this.message = 'Account created! Please log in.';
          this.router.navigate(['/login']);  // redirect to login
        },
        error: (err) => {
          this.message = 'Sign up failed. Please try again.';
          console.error(err);
        }
      });
  }
}
