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
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatButtonModule, TranslateModule, UpperCasePipe, RouterLink, MatProgressSpinner],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  selectedEmployee?: Employee;
  isLoadingEmployees: boolean = true;
  protected readonly Paths = Paths;
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private employeesService: EmployeesService,
    private messageService: MessageService,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService
      .getEmployees()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize((): boolean => (this.isLoadingEmployees = false))
      )
      .subscribe({
        next: (data: Employee[]): void => {
          const elementsNum: number = 5;
          const shuffled: Employee[] = data.sort(() => 0.5 - Math.random());
          this.employees = shuffled.slice(0, elementsNum);
          if (!data.length) {
            this.snackBarService.openSnackBar('list-empty', 'snackbar');
          }
        },
        error: (): void => {
          this.snackBarService.openSnackBar('list-fetch', 'snackbar');
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
