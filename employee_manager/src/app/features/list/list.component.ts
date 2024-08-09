import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
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
import { Paths } from '../../../enums/paths.enum';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    EmployeeComponent,
    TranslateModule,
    UpperCasePipe,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatProgressSpinner,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  isLoadingEmployees: boolean = true;
  protected readonly Paths = Paths;
  readonly dialog: MatDialog = inject(MatDialog);
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
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize((): boolean => (this.isLoadingEmployees = false))
      )
      .subscribe({
        next: (data: Employee[]): void => {
          data.sort((a: Employee, b: Employee) => Number(a.id) - Number(b.id));
          this.employees = data;
        },
        error: (err): void => {
          alert(err);
        },
        complete: (): void => {
          this.filteredEmployees = this.employees;
          this.messageService.add('fetch');
        },
      });
  }

  onAdd(): void {
    this.employeesService.setNewEmployeeId(this.calculateNewId());
  }

  calculateNewId(): string {
    return (Number(this.employees[this.employees.length - 1].id) + 1).toString();
  }

  deleteEmployee(employee: Employee): void {
    const employeeId: number = this.employees.indexOf(employee);
    this.employees.splice(employeeId, 1);
    this.employeesService.deleteEmployee(employee.id).subscribe({
      complete: (): void => {
        this.messageService.add(`delete ${employee.id}`);
      },
    });
  }

  openDialog(employee: Employee): void {
    const dialogRef: MatDialogRef<DialogDeleteComponent> = this.dialog.open(DialogDeleteComponent, {
      data: employee,
    });

    dialogRef.afterClosed().subscribe({
      next: (result): void => {
        if (result) {
          this.deleteEmployee(employee);
        }
      },
      error: (err): void => {
        alert(err);
      },
    });
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
