import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';

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
    private messageService: MessageService,
    private snackBar: MatSnackBar
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
          if (!data.length) {
            this.openSnackBar('list-empty', 'snackbar');
          }
        },
        error: (): void => {
          this.openSnackBar('list-fetch', 'snackbar');
        },
        complete: (): void => {
          this.filteredEmployees = this.employees;
          this.messageService.add('fetch');
        },
      });
  }

  deleteEmployee(employee: Employee): void {
    this.employeesService.deleteEmployee(employee.id).subscribe({
      error: (): void => {
        this.openSnackBar('delete-manager', 'snackbar');
      },
      complete: (): void => {
        this.messageService.add(`delete ${employee.id}`);
        this.getEmployees();
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
      error: (): void => {
        this.openSnackBar('error-occurred', 'snackbar');
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

  openSnackBar(message: string, panelClass: string): void {
    const duration = 5000;
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      panelClass: panelClass,
      duration: duration,
    });
  }
}
