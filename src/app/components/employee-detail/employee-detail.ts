import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/models';

@Component({
  selector: 'app-employee-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetail implements OnInit {

  // The employee to display
  employee: Employee | null = null;

  // UI state
  loading = false;
  error = '';

  constructor(
    private employeeService: EmployeeService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
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
      this.loadEmployee(id);
    }
  }

  // Load employee details from the backend
  loadEmployee(id: string) {
    this.loading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load employee.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}