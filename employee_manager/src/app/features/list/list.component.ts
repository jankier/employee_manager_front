import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { EmployeeComponent } from '../employee/employee.component';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { EmployeesService } from '../../services/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from '../../services/message.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmployeeComponent, TranslateModule, UpperCasePipe, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  employeesList: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedEmployee?: Employee;
  managers: string[] = [];
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private employeesService: EmployeesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getEmployeesList();
    this.updateEmployee(this.employeesService.updatedEmployee);
  }

  getEmployeesList(): void {
    this.employeesService
      .getEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: Employee[]): void => {
          data.sort((a: Employee, b: Employee) => Number(a.id) - Number(b.id));
          this.employeesList = data;
        },
        error: (err): void => {
          alert(err);
        },
        complete: (): void => {
          this.filteredEmployees = this.employeesList;
          this.messageService.add('fetch');
        },
      });
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.messageService.add(`select ${this.selectedEmployee.id}`);
    this.getNames();
  }

  updateEmployee(updatedEmployee: Employee): void {
    if (updatedEmployee.id) {
      const itemIndex: number = this.employeesList.findIndex((employee: Employee): boolean => employee.id == updatedEmployee.id);
      if (itemIndex < 0) {
        this.employeesList.push(updatedEmployee);
      }
      this.employeesList[itemIndex] = updatedEmployee;
      this.messageService.add(`update ${updatedEmployee.id}`);
      this.getNames();
    }
  }

  onAdd(): void {
    this.calculateNewId();
    this.getNames();
    this.messageService.add(`add ${this.calculateNewId()}`);
  }

  calculateNewId(): string {
    return (Number(this.employeesList[this.employeesList.length - 1].id) + 1).toString();
  }

  deleteEmployee(employee: Employee): void {
    const itemIndex: number = this.employeesList.indexOf(employee);
    this.employeesList.splice(itemIndex, 1);
    this.messageService.add(`delete ${employee.id}`);
    this.getNames();
  }

  getNames(): string[] {
    this.managers = [];
    this.employeesList.forEach((employee: Employee): void => {
      this.managers.push(employee.name + ' ' + employee.surname);
    });
    this.employeesService.managers = this.managers;
    return this.managers;
  }

  filterEmployees(value: string): void {
    if (!value) {
      this.filteredEmployees = this.employeesList;
      return;
    }
    this.filteredEmployees = this.employeesList.filter(
      (employee: Employee) =>
        employee?.name.toLowerCase().includes(value.toLowerCase()) || employee?.surname.toLowerCase().includes(value.toLowerCase())
    );
  }
}
