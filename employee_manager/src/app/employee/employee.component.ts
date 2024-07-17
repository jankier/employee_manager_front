import { Component } from '@angular/core';
import { Employee } from '../../types';
import { NgForOf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgForOf],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  employee: Employee = {
    id: 1,
    name: 'John',
    surname: 'Doe',
    employment_date: '2020-02-10',
    skills: ['TypeScript', 'Java', 'Angular'],
    projects: ['Todo app', 'Weather app'],
    manager: 'Jerry Smith',
  };
}
