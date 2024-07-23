import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillComponent } from '../skill/skill.component';
import { ProjectComponent } from '../project/project.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { Skills } from '../../enums/skills.enum';
import { Projects } from '../../enums/projects.enum';

interface EmployeeForm {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  employment_date: FormControl<string | null>;
  skills: FormControl<string[] | null>;
  projects: FormControl<string[] | null>;
  manager: FormControl<string | null>;
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, SkillComponent, ProjectComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  skillList: Skills[] = Object.values(Skills);
  projectList: Projects[] = Object.values(Projects);

  @Input() set employee(value: Employee) {
    this.employeeForm.patchValue({ ...value, skills: [...value.skills], projects: [...value.projects] });
    console.log(value);
  }

  @Output() updatedEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();

  employeeForm: FormGroup<EmployeeForm>;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      employment_date: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')]],
      skills: [['']],
      projects: [['']],
      manager: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.getRawValue() as Employee);
    this.updatedEmployee.emit(this.employeeForm.getRawValue() as Employee);
  }

  get skills() {
    return this.employeeForm.controls['skills'];
  }

  addSkill($event: string): void {
    if (!this.skills.value?.includes($event)) {
      this.skills.value?.push($event);
    }
  }

  deleteSkill($event: string): void {
    const itemIndex: number = this.skills.value!.findIndex((skill: string): boolean => skill == $event);
    this.skills.value?.splice(itemIndex, 1);
  }

  get projects() {
    return this.employeeForm.controls['projects'];
  }

  addProject($event: string): void {
    if (!this.projects.value?.includes($event)) {
      this.projects.value?.push($event);
    }
  }

  deleteProject($event: string): void {
    const itemIndex: number = this.projects.value!.findIndex((skill: string): boolean => skill == $event);
    this.projects.value?.splice(itemIndex, 1);
  }
}
