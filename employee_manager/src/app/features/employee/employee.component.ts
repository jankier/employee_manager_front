import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../models/employee.model';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillComponent } from './components/skill/skill.component';
import { ProjectComponent } from './components/project/project.component';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';
import { Skills } from '../../../enums/skills.enum';
import { Projects } from '../../../enums/projects.enum';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, SkillComponent, ProjectComponent, ReactiveFormsModule, DropdownComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  private allSkills: string[] = Object.values(Skills);
  skillList: string[] = this.allSkills;
  private allProjects: string[] = Object.values(Projects);
  projectList: string[] = this.allProjects;

  @Input() allManagers!: string[];
  managersList: string[] = this.allManagers;

  ngOnInit(): void {
    this.checkManagersList();
  }

  employeeForm: FormGroup;

  @Input() set employee(value: Employee) {
    this.employeeForm.patchValue({ ...value, skills: [...value.skills], projects: [...value.projects] });
    this.checkSkillsList();
    this.checkProjectsList();
    if (this.allManagers !== undefined) {
      this.checkManagersList();
    }
  }

  @Output() updatedEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.nonNullable.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      employmentDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')]], // Checks if date is of DD-MM-YYYY format.
      skills: [['']],
      projects: [['']],
      manager: [''],
    });
  }

  onSubmit(): void {
    this.updatedEmployee.emit(this.employeeForm.getRawValue() as Employee);
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
