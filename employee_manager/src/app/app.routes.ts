import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { Paths } from '../enums/paths.enum';

export const routes: Routes = [
  { path: '', redirectTo: Paths.DASHBOARD, pathMatch: 'full' },
  { path: Paths.DASHBOARD, component: DashboardComponent },
  { path: Paths.EMPLOYEES, loadComponent: () => import('./features/list/list.component').then((c) => c.ListComponent) },
  { path: Paths.EMPLOYEE + '/:id', loadComponent: () => import('./features/employee/employee.component').then((c) => c.EmployeeComponent) },
  {
    path: Paths.PROJECT + '/:project',
    loadComponent: () => import('./features/employee/components/project-details/project-details.component').then((c) => c.ProjectDetailsComponent),
  },
  { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then((c) => c.NotFoundComponent) },
];
