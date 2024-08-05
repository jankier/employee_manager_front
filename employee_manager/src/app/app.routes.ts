import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', loadComponent: () => import('./features/list/list.component').then((m) => m.ListComponent) },
  { path: 'employee/:id', loadComponent: () => import('./features/employee/employee.component').then((m) => m.EmployeeComponent) },
  {
    path: 'employee/:id/project/:project',
    loadComponent: () => import('./features/employee/components/project-details/project-details.component').then((m) => m.ProjectDetailsComponent),
  },
  { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent) },
];
