import { Component } from '@angular/core';
import { EMPLOYEES } from '../../../mocks/employees.mock';
import { Employee } from '../../../models/employee.model';
import { EmployeeComponent } from '../employee/employee.component';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EmployeeComponent, TranslateModule, UpperCasePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  employees: Employee[] = EMPLOYEES;
  filteredEmployees: Employee[] = this.employees;
  selectedEmployee?: Employee;
  managers: string[] = [];

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.getNames();
  }

  getNames(): string[] {
    this.managers = [];
    this.employees.forEach((employee: Employee): void => {
      this.managers.push(employee.name + ' ' + employee.surname);
    });
    return this.managers;
  }

  onUpdateEmployee($event: Employee): void {
    const itemIndex: number = this.employees.findIndex((employee: Employee): boolean => employee.id == $event.id);
    if (itemIndex < 0) {
      this.employees.push($event);
    }
    this.employees[itemIndex] = $event;
    console.log(this.employees);
    this.getNames();
  }

  onAdd(): void {
    const newId: string = this.calculateNewId();
    this.selectedEmployee = {
      id: newId,
      name: '',
      surname: '',
      employmentDate: '',
      skills: [],
      projects: [],
      manager: ' ',
    };
  }

  calculateNewId(): string {
    return (Number(this.employees[this.employees.length - 1].id) + 1).toString();
  }

  deleteEmployee(employee: Employee): void {
    const itemIndex: number = this.employees.indexOf(employee);
    this.employees.splice(itemIndex, 1);
    this.getNames();
  }

  filterEmployees(value: string): void {
    if (!value) {
      this.filteredEmployees = this.employees;
      return;
    }
    this.filteredEmployees = this.employees.filter(
      (employee: Employee) =>
        employee?.name.toLowerCase().includes(value.toLowerCase()) || employee?.surname.toLowerCase().includes(value.toLowerCase())
    );
  }
}
