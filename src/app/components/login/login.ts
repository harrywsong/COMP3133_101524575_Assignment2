import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// This component handles user login
@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // Form fields
  username = '';
  password = '';

  // UI state
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router, private readonly cdr: ChangeDetectorRef) {
    // If already logged in, redirect to employees page
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/employees']);
    }
  }

  // Called when the login form is submitted
  onSubmit() {
    this.loading = true;
    this.error = '';

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Invalid username or password. Please try again.';
        this.cdr.detectChanges();
      }
    });
  }
}