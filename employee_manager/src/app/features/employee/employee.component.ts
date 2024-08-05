import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillComponent } from './components/skill/skill.component';
import { ProjectComponent } from './components/project/project.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { Skills } from '../../../enums/skills.enum';
import { Projects } from '../../../enums/projects.enum';
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

export const DATE_FORMATS = {
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
  ],
  providers: [provideMomentDateAdapter(DATE_FORMATS)],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  private allSkills: string[] = Object.values(Skills);
  skillList: string[] = this.allSkills;
  private allProjects: string[] = Object.values(Projects);
  projectList: string[] = this.allProjects;

  allManagers: string[] = [];
  managersList: string[] = [];

  ngOnInit(): void {
    this.getEmployee();
    this.checkManagersList();
  }

  getEmployee(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.employeesService
      .getEmployee(id)
      .subscribe((employee: Employee) =>
        this.employeeForm.patchValue({ ...employee, skills: [...employee.skills], projects: [...employee.projects] })
      );
    this.checkSkillsList();
    this.checkProjectsList();
    if (this.allManagers !== undefined) {
      this.checkManagersList();
    }
    this.employeeForm.markAsUntouched();
  }

  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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

    this.allManagers = this.employeesService.managers;
    this.managersList = this.allManagers;
  }

  onSubmit(): void {
    this.employeesService.updatedEmployee = this.employeeForm.getRawValue() as Employee;
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
