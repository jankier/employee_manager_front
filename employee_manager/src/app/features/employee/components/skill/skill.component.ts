import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { SkillProject } from '../../../../../models/skill-project.model';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent {
  @Input() skill: SkillProject | undefined;

  @Output() selectedSkill: EventEmitter<SkillProject> = new EventEmitter<SkillProject>();

  onSelected(value: SkillProject): void {
    this.selectedSkill.emit(value);
  }
}
