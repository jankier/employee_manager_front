import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LowerCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { EmployeesService } from '../../../../services/employees.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { Project } from '../../../../../models/project.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MessageService } from '../../../../services/message.service';
import { SnackBarComponent } from '../../../../shared/components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [TranslateModule, LowerCasePipe, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinner],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit {
  idNotFound: string | null = '';
  isProjectMissing: boolean = false;
  isLoadingProject: boolean = true;
  private destroyRef: DestroyRef = inject(DestroyRef);

  project: Project | undefined;

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    this.employeeService
      .getProject(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize((): boolean => (this.isLoadingProject = false))
      )
      .subscribe({
        next: (project: Project): void => {
          this.project = project;
        },
        error: (): void => {
          this.isProjectMissing = true;
          this.idNotFound = id;
          this.openSnackBar('project-missing', 'snackbar');
        },
        complete: (): void => {
          this.messageService.add(`select-project ${id}`);
        },
      });
  }

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  goBack(): void {
    this.location.back();
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
