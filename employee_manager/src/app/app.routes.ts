import { Routes } from '@angular/router';
import { ProjectDetailsComponent } from './features/employee/components/project-details/project-details.component';
import { ListComponent } from './features/list/list.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'project/:project', component: ProjectDetailsComponent },
];
