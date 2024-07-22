import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectPageComponent } from './project-page/project-page.component';

export const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'project/:project', component: ProjectPageComponent },
];
