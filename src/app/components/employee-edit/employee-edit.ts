import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/models';

@Component({
  selector: 'app-employee-edit',
  imports: [FormsModule, RouterLink],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css'
})
export class EmployeeEdit implements OnInit {

  // Employee ID from the URL
  employeeId = '';

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
    private route: ActivatedRoute,
    private router: Router
  ) {
    // If not logged in, redirect to login
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    // Get the employee ID from the URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = id;
      this.loadEmployee(id);
    }
  }

  // Load existing employee data and pre-fill the form
  loadEmployee(id: string) {
    this.loading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (emp: Employee) => {
        this.first_name = emp.first_name;
        this.last_name = emp.last_name;
        this.email = emp.email;
        this.gender = emp.gender;
        this.designation = emp.designation;
        this.salary = emp.salary;
        this.date_of_joining = emp.date_of_joining.substring(0, 10);
        this.department = emp.department;
        this.employee_photo = emp.employee_photo || '';
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employee.';
        this.loading = false;
      }
    });
  }

  // Called when the form is submitted
  onSubmit() {
    this.loading = true;
    this.error = '';

    this.employeeService.updateEmployee(this.employeeId, {
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
        this.error = 'Failed to update employee. Please check all fields.';
      }
    });
  }
}