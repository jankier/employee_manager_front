import { Component } from '@angular/core';
import { EMPLOYEES } from '../../mocks/employees.mock';
import { Employee } from '../../models/employee.model';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EmployeeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  employees: Employee[] = EMPLOYEES;
  selectedEmployee?: Employee;

  calculateNewId(): string {
    return (Number(this.employees[this.employees.length - 1].id) + 1).toString();
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  onUpdateEmployee($event: Employee): void {
    const itemIndex: number = this.employees.findIndex((employee: Employee): boolean => employee.id == $event.id);
    if (itemIndex < 0) {
      this.employees.push($event);
    }
    this.employees[itemIndex] = $event;
  }

  onAdd(): void {
    const newId: string = this.calculateNewId();
    this.selectedEmployee = {
      id: newId,
      name: '',
      surname: '',
      employment_date: '',
      skills: [],
      projects: [],
      manager: '',
    };
  }
}
