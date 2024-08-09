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
  private allSkills: string[] = [];
  skillList: string[] = [];
  private allProjects: string[] = [];
  projectList: string[] = [];
  isAddMode: boolean = false;
  isLoadingEmployee: boolean = true;
  isLoadingEmployeeData: boolean = true;
  isEmployeeMissing: boolean = false;
  idNotFound: string | null = '';
  allManagers: string[] = [];
  managersList: string[] = [];

  protected readonly Paths = Paths;
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getEmployeesData();
    this.getEmployee();
  }

  getEmployeesData(): void {
    const getManagersData: Observable<Employee[]> = this.employeesService.getEmployees();
    const getSkillsData: Observable<string[]> = this.employeesService.getSkills();
    const getProjectsData: Observable<string[]> = this.employeesService.getProjects();
    forkJoin([getManagersData, getSkillsData, getProjectsData])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize((): boolean => (this.isLoadingEmployeeData = false))
      )
      .subscribe({
        next: ([managers, skills, projects]): void => {
          this.allManagers = managers.map((manager: Employee): string => manager.name + ' ' + manager.surname);
          this.allSkills = skills;
          this.allProjects = projects;
        },
        error: (err): void => {
          alert(err);
        },
        complete: (): void => {
          this.managersList = this.allManagers;
          this.skillList = this.allSkills;
          this.projectList = this.allProjects;
        },
      });
  }

  getEmployee(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !id;
    if (this.isAddMode) {
      this.employeeForm.setValue({
        id: this.employeesService.newEmployeeId.value,
        name: '',
        surname: '',
        employmentDate: '',
        skills: [],
        projects: [],
        manager: ' ',
      });
      this.isLoadingEmployee = false;
    } else {
      this.employeesService
        .getEmployee(id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize((): boolean => (this.isLoadingEmployee = false))
        )
        .subscribe({
          next: (employee: Employee): void => {
            this.employeeForm.patchValue({ ...employee, skills: [...employee.skills], projects: [...employee.projects] });
            this.checkManagersList();
            this.checkSkillsList();
            this.checkProjectsList();
          },
          error: (): void => {
            this.isEmployeeMissing = true;
            this.idNotFound = id;
          },
          complete: (): void => {
            this.messageService.add(`select ${this.employeeForm.value.id}`);
          },
        });
    }
    this.employeeForm.markAsUntouched();
  }

  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private employeesService: EmployeesService,
    private location: Location
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
        complete: (): void => {
          this.messageService.add(`add ${this.employeeForm.value.id}`);
          this.goBack();
        },
      });
    } else {
      this.employeesService.updateEmployee(this.employeeForm.getRawValue() as Employee).subscribe({
        complete: (): void => {
          this.messageService.add(`update ${this.employeeForm.value.id}`);
          this.goBack();
        },
      });
    }
    this.employeeForm.markAsUntouched();
  }

  get idControl(): FormControl {
    return this.employeeForm.controls['id'] as FormControl;
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

  addSkill(selectedSkill: string): void {
    this.skillsControl.value?.push(selectedSkill);
    this.checkSkillsList();
  }

  deleteSkill(selectedSkill: string): void {
    const itemIndex: number = this.skillsControl.value!.findIndex((skill: string): boolean => skill === selectedSkill);
    this.skillsControl.value?.splice(itemIndex, 1);
    this.checkSkillsList();
  }

  addProject(selectedProject: string): void {
    this.projectsControl.value?.push(selectedProject);
    this.checkProjectsList();
  }

  deleteProject(selectedProject: string): void {
    const itemIndex: number = this.projectsControl.value!.findIndex((skill: string): boolean => skill === selectedProject);
    this.projectsControl.value?.splice(itemIndex, 1);
    this.checkProjectsList();
  }

  onSelectedManager(manager: string): void {
    this.managerControl.setValue(manager);
    this.checkManagersList();
  }

  goBack(): void {
    this.location.back();
  }

  private checkSkillsList(): void {
    this.skillList = this.allSkills.filter((skill: string) => !this.employeeForm.controls['skills'].value?.includes(skill));
  }

  private checkProjectsList(): void {
    this.projectList = this.allProjects.filter((skill: string) => !this.employeeForm.controls['projects'].value?.includes(skill));
  }

  private checkManagersList(): void {
    this.managersList = this.allManagers.filter((manager: string) => !this.employeeForm.controls['manager'].value!.includes(manager));
    const currentEmployee: string = this.employeeForm.controls['name'].value + ' ' + this.employeeForm.controls?.['surname'].value;
    this.managersList.splice(this.managersList.indexOf(currentEmployee), 1);
  }
}
