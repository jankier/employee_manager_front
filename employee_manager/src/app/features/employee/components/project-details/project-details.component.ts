import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projects } from '../../../../../enums/projects.enum';
import { TranslateModule } from '@ngx-translate/core';
import { LowerCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [TranslateModule, LowerCasePipe, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  project = this.activatedRoute.snapshot.params['project'];

  projects: string[] = Object.values(Projects);

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
