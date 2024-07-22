import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillComponent } from '../skill/skill.component';
import { ProjectComponent } from '../project/project.component';
import { EMPLOYEES } from '../../mocks/employees.mock';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, SkillComponent, ProjectComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  employees: Employee[] = EMPLOYEES;
  selectedEmployee?: Employee;

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }
}
