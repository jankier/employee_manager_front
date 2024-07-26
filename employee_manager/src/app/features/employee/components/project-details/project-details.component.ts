import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsData } from '../../../../../models/projects.model';
import { PROJECTS } from '../../../../../mocks/project.mock';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  project = this.activatedRoute.snapshot.params['project'];

  projects: ProjectsData[] = PROJECTS;
}
