import { Routes } from '@angular/router';
import { ProjectPageComponent } from './project-page/project-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'project/:project', component: ProjectPageComponent },
];
