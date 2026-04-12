import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  SEARCH_EMPLOYEES,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE
} from '../graphql/graphql';
import { Employee } from '../models/models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  constructor(private apollo: Apollo) {}

  // Get all employees
  getAllEmployees() {
    return this.apollo.query<any>({
      query: GET_ALL_EMPLOYEES,
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => result.data.getAllEmployees)
    );
  }

  // Get a single employee by ID
  getEmployeeById(eid: string) {
    return this.apollo.query<any>({
      query: GET_EMPLOYEE_BY_ID,
      variables: { eid },
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => result.data.searchEmployeeById)
    );
  }

  // Search employees by department or designation
  searchEmployees(department?: string, designation?: string) {
    return this.apollo.query<any>({
      query: SEARCH_EMPLOYEES,
      variables: { department, designation },
      fetchPolicy: 'network-only'
    }).pipe(
      map(result => result.data.searchEmployeeByDeptOrDesignation)
    );
  }

  // Add a new employee
  addEmployee(data: Omit<Employee, '_id'>) {
    return this.apollo.mutate<any>({
      mutation: ADD_EMPLOYEE,
      variables: data
    }).pipe(
      map(result => result.data.addNewEmployee)
    );
  }

  // Update an existing employee by ID
  updateEmployee(eid: string, data: Partial<Employee>) {
    return this.apollo.mutate<any>({
      mutation: UPDATE_EMPLOYEE,
      variables: { eid, ...data }
    }).pipe(
      map(result => result.data.updateEmployeeById)
    );
  }

  // Delete an employee by ID
  deleteEmployee(eid: string) {
    return this.apollo.mutate<any>({
      mutation: DELETE_EMPLOYEE,
      variables: { eid }
    }).pipe(
      map(result => result.data.deleteEmployeeById)
    );
  }
}