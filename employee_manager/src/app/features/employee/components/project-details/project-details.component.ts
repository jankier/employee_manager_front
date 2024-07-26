import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projects } from '../../../../../enums/projects.enum';
import { TranslateModule } from '@ngx-translate/core';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [TranslateModule, LowerCasePipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  project = this.activatedRoute.snapshot.params['project'];

  projects: string[] = Object.values(Projects);
}
