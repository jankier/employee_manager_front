import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { EmployeeComponent } from '../employee/employee.component';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { EmployeesService } from './services/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [EmployeeComponent, TranslateModule, UpperCasePipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedEmployee?: Employee;
  managers: string[] = [];
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private employeesService: EmployeesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: Employee[]): void => {
          this.employees = data;
        },
        error: (err): void => {
          alert(err);
        },
        complete: (): void => {
          this.filteredEmployees = this.employees;
        },
      });
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.messageService.add(`select ${this.selectedEmployee.id}`);
    this.getNames();
  }

  onUpdateEmployee(updatedEmployee: Employee): void {
    const itemIndex: number = this.employees.findIndex((employee: Employee): boolean => employee.id == updatedEmployee.id);
    if (itemIndex < 0) {
      this.employees.push(updatedEmployee);
    }
    this.employees[itemIndex] = updatedEmployee;
    this.messageService.add(`update ${updatedEmployee.id}`);
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
    this.messageService.add(`add ${newId}`);
  }

  calculateNewId(): string {
    return (Number(this.employees[this.employees.length - 1].id) + 1).toString();
  }

  deleteEmployee(employee: Employee): void {
    const itemIndex: number = this.employees.indexOf(employee);
    this.employees.splice(itemIndex, 1);
    this.messageService.add(`delete ${employee.id}`);
    this.getNames();
  }

  getNames(): string[] {
    this.managers = [];
    this.employees.forEach((employee: Employee): void => {
      this.managers.push(employee.name + ' ' + employee.surname);
    });
    return this.managers;
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
