import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { MessageService } from '../../services/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Paths } from '../../../enums/paths.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, TranslateModule, UpperCasePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee?: Employee;
  protected readonly Paths = Paths;
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
          const shuffled: Employee[] = data.sort(() => 0.5 - Math.random());
          this.employees = shuffled.slice(0, 5);
        },
        error: (err): void => {
          alert(err);
        },
        complete: (): void => {
          this.messageService.add('random');
        },
      });
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
    this.messageService.add(`select ${this.selectedEmployee.id}`);
  }
}
