import { Routes } from '@angular/router';
import { Paths } from '../enums/paths.enum';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { Roles } from '../enums/roles.enum';

export const routes: Routes = [
  { path: '', redirectTo: Paths.LOGIN, pathMatch: 'full' },
  { path: Paths.LOGIN, component: LoginComponent },
  {
    path: Paths.CHANGE_PASSWORD,
    loadComponent: () => import('./features/change-password/change-password.component').then((c) => c.ChangePasswordComponent),
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN, Roles.USER] },
  },
  {
    path: Paths.DASHBOARD,
    loadComponent: () => import('./features/dashboard/dashboard.component').then((c) => c.DashboardComponent),
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN, Roles.USER] },
  },
  {
    path: Paths.EMPLOYEES,
    loadComponent: () => import('./features/list/list.component').then((c) => c.ListComponent),
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN, Roles.USER] },
  },
  {
    path: Paths.EMPLOYEE + '/:id',
    loadComponent: () => import('./features/employee/employee.component').then((c) => c.EmployeeComponent),
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN] },
  },
  {
    path: Paths.CREATE,
    loadComponent: () => import('./features/employee/employee.component').then((c) => c.EmployeeComponent),
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN] },
  },
  {
    path: Paths.PROJECT + '/:id',
    loadComponent: () => import('./features/employee/components/project-details/project-details.component').then((c) => c.ProjectDetailsComponent),
    canActivate: [AuthGuard],
    data: { roles: [Roles.ADMIN] },
  },
  { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then((c) => c.NotFoundComponent) },
];
