import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { NgForOf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EMPLOYEES } from '../../mock/employees.mock';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [UpperCasePipe, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  employees: Employee[] = EMPLOYEES;
  selectedEmployee?: Employee;

  public onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }
}
