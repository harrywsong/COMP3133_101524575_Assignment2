import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/models';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  // List of employees to display
  employees: Employee[] = [];

  // Search fields
  searchDepartment = '';
  searchDesignation = '';

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

  ngOnInit() {
    this.loadEmployees();
  }

  // Get the currently logged in user
  getUser() {
    return this.auth.getUser();
  }

  // Load all employees from the backend
  loadEmployees() {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employees.';
        this.loading = false;
      }
    });
  }

  // Search employees by department or designation
  onSearch() {
    if (!this.searchDepartment && !this.searchDesignation) {
      this.loadEmployees();
      return;
    }

    this.loading = true;
    this.employeeService.searchEmployees(this.searchDepartment, this.searchDesignation).subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No employees found.';
        this.employees = [];
        this.loading = false;
      }
    });
  }

  // Delete an employee by ID
  deleteEmployee(eid: string) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.employeeService.deleteEmployee(eid).subscribe({
      next: () => {
        this.employees = this.employees.filter(e => e._id !== eid);
      },
      error: () => {
        this.error = 'Failed to delete employee.';
      }
    });
  }

  // Logout the current user
  logout() {
    this.auth.logout();
  }
}