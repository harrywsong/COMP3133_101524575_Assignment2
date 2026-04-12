import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-add',
  imports: [FormsModule, RouterLink],
  templateUrl: './employee-add.html',
  styleUrl: './employee-add.css'
})
export class EmployeeAdd {

  // Form fields
  first_name = '';
  last_name = '';
  email = '';
  gender = '';
  designation = '';
  salary = 0;
  date_of_joining = '';
  department = '';
  employee_photo = '';

  // UI state
  loading = false;
  error = '';

  constructor(
    private employeeService: EmployeeService,
    private auth: AuthService,
    private router: Router
  ) {
    // If not logged in, redirect to login
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  // Called when the form is submitted
  onSubmit() {
    this.loading = true;
    this.error = '';

    this.employeeService.addEmployee({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      gender: this.gender,
      designation: this.designation,
      salary: this.salary,
      date_of_joining: this.date_of_joining,
      department: this.department,
      employee_photo: this.employee_photo
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.loading = false;
        this.error = 'Failed to add employee. Please check all fields.';
      }
    });
  }
}