import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillComponent } from './components/skill/skill.component';
import { ProjectComponent } from './components/project/project.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from '../../services/message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, forkJoin, Observable } from 'rxjs';
import { Paths } from '../../../enums/paths.enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SkillProject } from '../../../models/skill-project.model';
import { Manager } from '../../../models/manager.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';

export const dateFormat = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    SkillComponent,
    ProjectComponent,
    ReactiveFormsModule,
    DropdownComponent,
    TranslateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    RouterLink,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [provideMomentDateAdapter(dateFormat)],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  private allSkills: SkillProject[] = [];
  skillList: SkillProject[] = [];
  private allProjects: SkillProject[] = [];
  projectList: SkillProject[] = [];
  isAddMode: boolean = false;
  isLoadingEmployee: boolean = true;
  isLoadingEmployeeData: boolean = true;
  isEmployeeMissing: boolean = false;
  idNotFound: string | null = '';
  allManagers: Manager[] = [];
  id: string | null = null;

  protected readonly Paths = Paths;
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;
    this.getEmployeesData();
    this.getEmployee();
  }

  getEmployeesData(): void {
    let getManagersData: Observable<Employee[]> = this.employeesService.getEmployees();
    if (!this.isAddMode) {
      getManagersData = this.employeesService.getManagers(this.id);
    }
    const getSkillsData: Observable<SkillProject[]> = this.employeesService.getSkills();
    const getProjectsData: Observable<SkillProject[]> = this.employeesService.getProjects();
    forkJoin([getManagersData, getSkillsData, getProjectsData])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize((): boolean => (this.isLoadingEmployeeData = false))
      )
      .subscribe({
        next: ([managers, skills, projects]): void => {
          this.allManagers = managers.map((manager: Employee) => ({
            id: manager.id,
            name: manager.name,
            surname: manager.surname,
            manager: manager.manager,
          }));
          this.allSkills = skills;
          this.allProjects = projects;
          this.checkSkillsList();
          this.checkProjectsList();
        },
        error: (): void => {
          this.openSnackBar('employee-data-fetch', 'snackbar');
        },
      });
  }

  getEmployee(): void {
    if (this.isAddMode) {
      this.employeeForm.setValue({
        id: null,
        name: '',
        surname: '',
        employmentDate: '',
        skills: [],
        projects: [],
        manager: null,
      });
      this.isLoadingEmployee = false;
    } else {
      this.employeesService
        .getEmployee(this.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize((): boolean => (this.isLoadingEmployee = false))
        )
        .subscribe({
          next: (employee: Employee): void => {
            this.employeeForm.patchValue({ ...employee, skills: [...employee.skills], projects: [...employee.projects] });
            this.checkSkillsList();
            this.checkProjectsList();
          },
          error: (): void => {
            this.isEmployeeMissing = true;
            this.idNotFound = this.id;
            this.openSnackBar('employee-missing', 'snackbar');
          },
          complete: (): void => {
            this.messageService.add(`select ${this.employeeForm.value.id}`);
          },
        });
    }
    this.employeeForm.markAsUntouched();
  }

  employeeForm: FormGroup;

  compareObjects(obj1: Manager, obj2: Manager) {
    if (obj1 === null || obj2 === null) {
      return false;
    }
    return obj1.name == obj2.name && obj1.id == obj2.id;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private employeesService: EmployeesService,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    this.employeeForm = this.fb.nonNullable.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      employmentDate: ['', [Validators.required]],
      skills: [['']],
      projects: [['']],
      manager: [''],
    });
  }

  onSubmit(): void {
    if (this.isAddMode) {
      this.employeesService.addEmployee(this.employeeForm.getRawValue() as Employee).subscribe({
        error: (): void => {
          this.openSnackBar('employee-add', 'snackbar');
        },
        complete: (): void => {
          this.messageService.add('add');
          this.goBack();
        },
      });
    } else {
      this.employeesService.updateEmployee(this.employeeForm.getRawValue() as Employee).subscribe({
        error: (): void => {
          this.openSnackBar('employee-update', 'snackbar');
        },
        complete: (): void => {
          this.messageService.add(`update ${this.employeeForm.value.id}`);
          this.goBack();
        },
      });
    }
    this.employeeForm.markAsUntouched();
  }

  get nameControl(): FormControl {
    return this.employeeForm.controls['name'] as FormControl;
  }

  get surnameControl(): FormControl {
    return this.employeeForm.controls['surname'] as FormControl;
  }

  get employmentDateControl(): FormControl {
    return this.employeeForm.controls['employmentDate'] as FormControl;
  }

  get skillsControl(): FormControl {
    return this.employeeForm.controls['skills'] as FormControl;
  }

  get projectsControl(): FormControl {
    return this.employeeForm.controls['projects'] as FormControl;
  }

  get managerControl(): FormControl {
    return this.employeeForm.controls['manager'] as FormControl;
  }

  addSkill(selectedSkill: SkillProject): void {
    this.skillsControl.value?.push(selectedSkill);
    this.checkSkillsList();
  }

  deleteSkill(selectedSkill: SkillProject): void {
    const itemIndex: number = this.skillsControl.value!.findIndex((obj: SkillProject) => obj === selectedSkill);
    this.skillsControl.value?.splice(itemIndex, 1);
    this.checkSkillsList();
  }

  addProject(selectedProject: SkillProject): void {
    this.projectsControl.value?.push(selectedProject);
    this.checkProjectsList();
  }

  deleteProject(selectedProject: SkillProject): void {
    const itemIndex: number = this.projectsControl.value!.findIndex((obj: SkillProject) => obj === selectedProject);
    this.projectsControl.value?.splice(itemIndex, 1);
    this.checkProjectsList();
  }

  onSelectedManager(selectedManager: Manager): void {
    this.managerControl.setValue(selectedManager);
  }

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

  private checkSkillsList(): void {
    this.skillList = this.allSkills.filter(
      (skill: SkillProject) => !this.employeeForm.controls['skills'].value.find((obj: { id: number }) => obj.id === skill.id)
    );
  }

  private checkProjectsList(): void {
    this.projectList = this.allProjects.filter(
      (project: SkillProject) => !this.employeeForm.controls['projects'].value?.find((obj: { id: number }) => obj.id === project.id)
    );
  }
}
