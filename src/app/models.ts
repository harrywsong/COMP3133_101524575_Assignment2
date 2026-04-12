export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Employee {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  designation: string;
  salary: number;
  date_of_joining: string;
  department: string;
  employee_photo?: string;
}