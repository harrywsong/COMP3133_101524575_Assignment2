import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  // Form fields
  username = '';
  email = '';
  password = '';

  // UI state
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {
    // If already logged in, redirect to employees
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/employees']);
    }
  }

  // Called when the signup form is submitted
  onSubmit() {
    this.loading = true;
    this.error = '';

    this.auth.signup(this.username, this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Signup failed. Username or email may already exist.';
      }
    });
  }
}