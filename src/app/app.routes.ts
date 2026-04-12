import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeAdd } from './components/employee-add/employee-add';
import { EmployeeDetail } from './components/employee-detail/employee-detail';
import { EmployeeEdit } from './components/employee-edit/employee-edit';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'employees', component: EmployeeList },
  { path: 'employees/add', component: EmployeeAdd },
  { path: 'employees/:id', component: EmployeeDetail },
  { path: 'employees/:id/edit', component: EmployeeEdit },
  { path: '**', redirectTo: '/login' }
];