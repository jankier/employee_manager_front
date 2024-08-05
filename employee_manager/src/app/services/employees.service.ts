import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EMPLOYEES } from '../../mocks/employees.mock';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  managers: string[] = [
    'John Doe',
    'Will Smith',
    'Angela White',
    'Derek Blackwood',
    'Nathan Hawthorne',
    'Sophia Reynolds',
    'Maxwell Sanchez',
    'Ava Harper',
    'Robert Hardy',
    'James Newman',
  ];

  updatedEmployee: Employee = {
    id: '',
    name: '',
    surname: '',
    employmentDate: '',
    skills: [],
    projects: [],
    manager: ' ',
  };

  getEmployees(): Observable<Employee[]> {
    return of(EMPLOYEES);
  }

  getEmployee(id: number): Observable<Employee> {
    const employee: Employee = EMPLOYEES.find((selectedEmployee: Employee): boolean => Number(selectedEmployee.id) === id)!;
    if (!employee) {
      const newEmployee: Employee = {
        id: id.toString(),
        name: '',
        surname: '',
        employmentDate: '',
        skills: [],
        projects: [],
        manager: ' ',
      };
      return of(newEmployee);
    }

    return of(employee);
  }
}
