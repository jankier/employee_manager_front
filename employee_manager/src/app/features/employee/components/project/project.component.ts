import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Paths } from '../../../../../enums/paths.enum';
import { SkillProject } from '../../../../../models/skill-project.model';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatChipsModule, MatIconModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  protected readonly Paths = Paths;
  @Input() project: SkillProject | undefined;

  @Output() selectedProject: EventEmitter<SkillProject> = new EventEmitter<SkillProject>();

  onSelected(value: SkillProject): void {
    this.selectedProject.emit(value);
  }
}
